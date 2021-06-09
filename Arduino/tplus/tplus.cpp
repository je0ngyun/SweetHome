#include "tplus.h"

#include <functional>

#include "ESP8266WiFi.h"
#include "LittleFS.h"

tplus::tplus() :
  server_(80) {}

tplus::~tplus() {}

void tplus::setup() {
  Serial.begin(115200);
  if(!LittleFS.begin()) {
    Serial.println("LittleFS Error!!");
    return;
  }

  setup_mqtt();
  setup_wifi();
  setup_server();
}

void tplus::setup_server() {
  server_.serveStatic("/assets", LittleFS, "/assets");
  server_.serveStatic("/script", LittleFS, "/script");
  server_.serveStatic("/css", LittleFS, "/css");
  server_.serveStatic("/views", LittleFS, "/views");
  server_.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");

  server_.on("/scan", HTTP_GET, bind(&tplus::on_scan, this, placeholders::_1));
  server_.on("/reset", HTTP_GET, bind(&tplus::on_reset, this, placeholders::_1));
  server_.on("/state", HTTP_GET, bind(&tplus::on_state, this, placeholders::_1));
  server_.on("/action", HTTP_GET, bind(&tplus::on_action, this, placeholders::_1));

  AsyncCallbackJsonWebHandler* handler = new AsyncCallbackJsonWebHandler("/connect", bind(&tplus::on_connect, this, placeholders::_1, placeholders::_2));
  server_.addHandler(handler);

  server_.begin();
}

void tplus::setup_wifi() {
  wifi_connect_handler_ = WiFi.onStationModeGotIP(bind(&tplus::on_wifi_connected, this, placeholders::_1));
  wifi_disconnect_handler_ = WiFi.onStationModeDisconnected(bind(&tplus::on_wifi_disconnected, this, placeholders::_1));

  connect_wifi();
}

void tplus::setup_mqtt() {
  mqtt_client_.onConnect(bind(&tplus::on_mqtt_connect, this, placeholders::_1));
  mqtt_client_.onDisconnect(bind(&tplus::on_mqtt_disconnect, this, placeholders::_1));
  mqtt_client_.onSubscribe(bind(&tplus::on_mqtt_subscribe, this, placeholders::_1, placeholders::_2));
  mqtt_client_.onUnsubscribe(bind(&tplus::on_mqtt_unsubscribe, this, placeholders::_1));
  mqtt_client_.onMessage(bind(&tplus::on_mqtt_message, this, placeholders::_1, placeholders::_2, placeholders::_3, placeholders::_4, placeholders::_5, placeholders::_6));
  mqtt_client_.onPublish(bind(&tplus::on_mqtt_publish, this, placeholders::_1));
}

void tplus::on_scan(AsyncWebServerRequest* request) {
  String json = "[";
  int n = WiFi.scanComplete();
  if(n == -2){
    WiFi.scanNetworks(true);
  } else if(n){
    for (int i = 0; i < n; ++i){
      if(i) json += ",";
      json += "{";
      json += "\"rssi\":"+String(WiFi.RSSI(i));
      json += ",\"ssid\":\""+WiFi.SSID(i)+"\"";
      json += ",\"bssid\":\""+WiFi.BSSIDstr(i)+"\"";
      json += ",\"channel\":"+String(WiFi.channel(i));
      json += ",\"secure\":"+String(WiFi.encryptionType(i));
      json += ",\"hidden\":"+String(WiFi.isHidden(i)?"true":"false");
      json += "}";
    }
    WiFi.scanDelete();
    if(WiFi.scanComplete() == -2){
      WiFi.scanNetworks(true);
    }
  }
  json += "]";
  request->send(200, "application/json", json);
  json = String();
}

void tplus::on_reset(AsyncWebServerRequest* request) {
  eeprom_.reset();
  request->send(200, "application/json", "{\"result\": \"success\"}");
  WiFi.disconnect();
  ESP.reset();
  ESP.restart();
}

void tplus::on_state(AsyncWebServerRequest* request) {
  DynamicJsonDocument doc(512);
  String json;

  JsonObject object = doc.to<JsonObject>();
  JsonArray array = object.createNestedArray("states");
  for (const pair<int, bool> p : switch_) {
    array.add(p.second);
  }

  serializeJson(doc, json);
  request->send(200, "application/json", json);
}

void tplus::on_action(AsyncWebServerRequest* request) {
  DynamicJsonDocument doc(512);
  String json;
  
  JsonObject object = doc.to<JsonObject>();
  
  if (request->hasParam("switch")) {
    int n = request->getParam("switch")->value().toInt();
    if (n >= 0 && n < switch_.size()) {
      switch_[n].second = !switch_[n].second;
      object["result"] = "success";
    } else {
      object["result"] = "fail";
    }
    publish_state();
  } else {
    object["result"] = "fail";
  }
  
  JsonArray array = object.createNestedArray("states");
  for (const pair<int, bool> p : switch_) {
    array.add(p.second);
  }

  serializeJson(doc, json);
  request->send(200, "application/json", json);
}

void tplus::on_connect(AsyncWebServerRequest* request, JsonVariant& json) {
  const JsonObject& jsonObj = json.as<JsonObject>();
  String ssid = jsonObj["ssid"];
  String password = jsonObj["password"];

  eeprom_.write_string(eeprom_.SSID_ADDRESS, ssid);
  eeprom_.write_string(eeprom_.PASSWORD_ADDRESS, password);
  
  ESP.restart();
}

void tplus::get_broker_ip() {
  broker_ip_ = udp_.remoteIP();
  broker_ip_ = IPAddress(14, 55, 61, 153);
  if (broker_ip_.isSet()) {
    connect_mqtt();
    udp_reciver_timer_.detach();
  }
}

void tplus::on_wifi_connected(const WiFiEventStationModeGotIP& event) {
  Serial.println("Connected to WiFi");
  Serial.println(WiFi.localIP());
  IPAddress broadcastIp = WiFi.localIP();
  broadcastIp[3] = 255;
  udp_.begin(4210);
  udp_.beginPacket(broadcastIp, 4210);
  udp_.print(0x00);
  udp_.endPacket();

  udp_reciver_timer_.attach(1, bind(&tplus::get_broker_ip, this));
}

void tplus::on_wifi_disconnected(const WiFiEventStationModeDisconnected& event) {
  mqtt_reconnecte_timer_.detach();
  WiFi.mode(WIFI_AP);
  WiFi.softAP(AP_SSID, AP_PASSWORD);
}

void tplus::connect_wifi() {
  Serial.print("Connecting to WiFi");
  String ssid = eeprom_.read_string(eeprom_.SSID_ADDRESS);
  String password = eeprom_.read_string(eeprom_.PASSWORD_ADDRESS);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
}

void tplus::on_mqtt_connect(bool session_present) {
  Serial.println("Connected to MQTT");
  String topic = WiFi.localIP() + "/action";
  mqtt_client_.subscribe(topic.c_str(), 0);
  publish_regist();
}

void tplus::on_mqtt_disconnect(AsyncMqttClientDisconnectReason reason) {
  Serial.println("Disconnected from MQTT");

  if (WiFi.isConnected()) {
    mqtt_reconnecte_timer_.once(2, bind(&tplus::connect_mqtt, this));
  }
}

void tplus::on_mqtt_subscribe(uint16_t packet_id, uint8_t qos) {
  Serial.println("Subscribe acknowledged");
  Serial.print("  packet id: ");
  Serial.println(packet_id);
  Serial.print("  qos: ");
  Serial.println(qos);
}

void tplus::on_mqtt_unsubscribe(uint16_t packet_id) {
  Serial.println("Unsubscribe acknowledged");
  Serial.print("  packet id: ");
  Serial.println(packet_id);
}

void tplus::on_mqtt_message(char* topic, char* payload, AsyncMqttClientMessageProperties properties, size_t len, size_t index, size_t total) {
  Serial.println("Publish received");
  Serial.print("  topic: ");
  Serial.println(topic);
  Serial.print("  qos: ");
  Serial.println(properties.qos);
  Serial.print("  dup: ");
  Serial.println(properties.dup);
  Serial.print("  retain: ");
  Serial.println(properties.retain);
  Serial.print("  len: ");
  Serial.println(len);
  Serial.print("  index: ");
  Serial.println(index);
  Serial.print("  total: ");
  Serial.println(total);
}

void tplus::on_mqtt_publish(uint16_t packet_id) {
  Serial.println("Publish acknowledged");
  Serial.print("  packet id: ");
  Serial.println(packet_id);
}

void tplus::connect_mqtt() {
  Serial.println("Connecting to MQTT");
  Serial.println(broker_ip_);
  mqtt_client_.setServer(broker_ip_, 1883);
  mqtt_client_.connect();
  Serial.println();
}

uint16_t tplus::subscribe_action() {

}

uint16_t tplus::publish_state() {
  DynamicJsonDocument doc(512);
  String json;
  JsonObject object = doc.to<JsonObject>();
  object["device_host"] = WiFi.localIP().toString();
  JsonArray array = object.createNestedArray("device_state");
  for (const pair<int, bool> p : switch_) {
    array.add(p.second);
  }

  uint16_t packet_id = mqtt_client_.publish("state", 2, true, json.c_str());
  return packet_id;
}

uint16_t tplus::publish_regist() {
  DynamicJsonDocument doc(512);
  String json;
  JsonObject object = doc.to<JsonObject>();
  object["device_host"] = WiFi.localIP().toString();
  object["device_name"] = WiFi.hostname();
  object["device_way"] = switch_.size();
  serializeJson(doc, json);

  uint16_t packet_id = mqtt_client_.publish("regist", 2, true, json.c_str());
  return packet_id;
}

void tplus::add_switch(int pin) {
  switch_.push_back(make_pair(pin, false));
  pinMode(pin, OUTPUT);
}

const vector<pair<int, bool>>& tplus::get_switchs() {
  return switch_;
}

bool tplus::mqtt_connected() {
  return mqtt_client_.connected();
}