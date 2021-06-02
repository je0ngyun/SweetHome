#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <AsyncJson.h>
#include <ArduinoJson.h>

AsyncWebServer server(80);

void serverSetup() {
  server.serveStatic("/assets", LittleFS, "/assets");
  server.serveStatic("/script", LittleFS, "/script");
  server.serveStatic("/css", LittleFS, "/css");
  server.serveStatic("/views", LittleFS, "/views");
  server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");
  
  server.on("/scan", HTTP_GET, [](AsyncWebServerRequest *request){
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

  server.on("/reset", HTTP_GET, [](AsyncWebServerRequest *request){
    eepromReset();
    request->send(200, "application/json", "{\"result\": \"success\"}");
    WiFi.disconnect();
    ESP.reset();
    ESP.restart();
  });

  server.on("/state", HTTP_GET, [](AsyncWebServerRequest *request){
    DynamicJsonDocument doc(512);
    String json;

    JsonObject object = doc.to<JsonObject>();
    //object["category"] = category;
    //object["way"] = way;
    JsonArray array = object.createNestedArray("states");
    for (int i = 0; i < way; i++) {
      array.add(state[i]);
    }

    serializeJson(doc, json);
    request->send(200, "application/json", json);
  });

  server.on("/action", HTTP_GET, [](AsyncWebServerRequest *request){
    DynamicJsonDocument doc(512);
    String json;
    
    JsonObject object = doc.to<JsonObject>();
    
    if (request->hasParam("switch")) {
      int n = request->getParam("switch")->value().toInt();
      if (n >= 0 && n < way) {
        state[n] = !state[n];
        object["result"] = "success";
      } else {
        object["result"] = "fail";
      }
    } else {
      object["result"] = "fail";
    }
    
    JsonArray array = object.createNestedArray("states");
    for (int i = 0; i < way; i++) {
      array.add(state[i]);
    }

    serializeJson(doc, json);
    request->send(200, "application/json", json);

    udp.beginPacket(broadcastIp, UDP_PORT);
    udp.print(0x01);
    for (int i = 0; i < way; i++) {
      udp.print(state[i]);
    }
    udp.print(way);
    udp.endPacket();
  });

  AsyncCallbackJsonWebHandler* handler = new AsyncCallbackJsonWebHandler("/connect", [](AsyncWebServerRequest *request, JsonVariant &json) {
    const JsonObject& jsonObj = json.as<JsonObject>();
    String ssid = jsonObj["ssid"];
    String password = jsonObj["password"];

    eepromWriteString(SSID_ADDRESS, ssid);
    eepromWriteString(PASSWORD_ADDRESS, password);
    EEPROM.commit();
    
    ESP.restart();
  });
  server.addHandler(handler);

  server.begin();
}
