#include "tplus.h"

#include "ESP8266WiFi.h"
#include "LittleFS.h"
#include "AsyncJson.h"
#include "ArduinoJson.h"

tplus::tplus() :
  web_server_(80) {}

tplus::~tplus() {}

void tplus::setup() {
  String ssid = eeprom_.read_string(eeprom_.SSID_ADDRESS);
  String password = eeprom_.read_string(eeprom_.PASSWORD_ADDRESS);
  wifi_.setup(ssid, password);

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