#include "tplus.h"

#include "ESP8266WiFi.h"
#include "LittleFS.h"
#include "AsyncJson.h"
#include "ArduinoJson.h"

tplus::tplus() :
  web_server_(80) {}

tplus::~tplus() {}

void tplus::setup() {
  Serial.begin(115200);
  if(!LittleFS.begin()) {
    Serial.println("LittleFS 오류");
    return;
  }
  String ssid = eeprom_.read_string(eeprom_.SSID_ADDRESS);
  String password = eeprom_.read_string(eeprom_.PASSWORD_ADDRESS);
  wifi_.setup(ssid, password);

  broker_ip_ = wifi_.get_broker_ip();
  Serial.println(broker_ip_);
  mqtt_client_.onConnect([=](bool session_present) {
    Serial.println("HelloWorld!!");
    DynamicJsonDocument doc(512);
    String json;
    JsonObject object = doc.to<JsonObject>();
    object["device_host"] = wifi_.get_local_ip();
    object["device_name"] = wifi_.get_host_name();
    object["device_way"] = switch_.size();
    serializeJson(doc, json);

    uint16_t packetIdPub1 = mqtt_client_.publish("regist", 1, true, json.c_str());
    Serial.println(packetIdPub1);
  });
  mqtt_client_.onDisconnect([=](AsyncMqttClientDisconnectReason reason) {

  });

  mqtt_client_.setServer(broker_ip_, 1883);

  web_server_.serveStatic("/assets", LittleFS, "/assets");
  web_server_.serveStatic("/script", LittleFS, "/script");
  web_server_.serveStatic("/css", LittleFS, "/css");
  web_server_.serveStatic("/views", LittleFS, "/views");
  web_server_.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");

  web_server_.on("/scan", HTTP_GET, [](AsyncWebServerRequest *request){
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
  });

  web_server_.on("/reset", HTTP_GET, [=](AsyncWebServerRequest *request){
    eeprom_.reset();
    request->send(200, "application/json", "{\"result\": \"success\"}");
    WiFi.disconnect();
    ESP.reset();
    ESP.restart();
  });

  web_server_.on("/state", HTTP_GET, [=](AsyncWebServerRequest *request){
    DynamicJsonDocument doc(512);
    String json;

    JsonObject object = doc.to<JsonObject>();
    JsonArray array = object.createNestedArray("states");
    for (const pair<int, bool> p : switch_) {
      array.add(p.second);
    }

    serializeJson(doc, json);
    request->send(200, "application/json", json);
  });

  web_server_.on("/action", HTTP_GET, [=](AsyncWebServerRequest *request){
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
    } else {
      object["result"] = "fail";
    }
    
    JsonArray array = object.createNestedArray("states");
    for (const pair<int, bool> p : switch_) {
      array.add(p.second);
    }

    serializeJson(doc, json);
    request->send(200, "application/json", json);
  });

  AsyncCallbackJsonWebHandler* handler = new AsyncCallbackJsonWebHandler("/connect", [=](AsyncWebServerRequest *request, JsonVariant &json) {
    const JsonObject& jsonObj = json.as<JsonObject>();
    String ssid = jsonObj["ssid"];
    String password = jsonObj["password"];

    eeprom_.write_string(eeprom_.SSID_ADDRESS, ssid);
    eeprom_.write_string(eeprom_.SSID_ADDRESS, password);
    
    ESP.restart();
  });
  web_server_.addHandler(handler);

  web_server_.begin();
}

void tplus::add_switch(int pin) {
  switch_.push_back(make_pair(pin, false));
  pinMode(pin, OUTPUT);
}

const vector<pair<int, bool>>& tplus::get_switchs() {
  return switch_;
}

void tplus::onMqttConnect(bool session_present) {
  DynamicJsonDocument doc(512);
  String json;
  JsonObject object = doc.to<JsonObject>();
  object["device_host"] = wifi_.get_local_ip();
  object["device_name"] = wifi_.get_host_name();
  object["device_way"] = switch_.size();
  serializeJson(doc, json);

  uint16_t packetIdPub1 = mqtt_client_.publish("regist", 1, true, json.c_str());
}