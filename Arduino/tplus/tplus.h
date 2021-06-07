#ifndef TPLUS_H
#define TPLUS_H

#include <utility>
#include <vector>

#include "Arduino.h"
#include "ESP8266WiFi.h"
#include "ESPAsyncWebServer.h"
#include "AsyncMqttClient.h"
#include "AsyncJson.h"
#include "ArduinoJson.h"
#include "Ticker.h"

#include "tplus_eeprom.h"

#define AP_SSID "tplus"
#define AP_PASSWORD "1234qwer"

using namespace std;

class tplus {
public:
  tplus();
  ~tplus();
  void setup();
  void add_switch(int pin);
  const vector<pair<int, bool>>& get_switchs();
  bool mqtt_connected();
private:
  tplus_eeprom eeprom_;
  WiFiEventHandler wifi_connect_handler_;
  WiFiEventHandler wifi_disconnect_handler_;
  AsyncWebServer server_;

  IPAddress broker_ip_;
  AsyncMqttClient mqtt_client_;
  Ticker mqtt_reconnecte_timer_;

  vector<pair<int, bool>> switch_;

  void setup_server();
  void on_scan(AsyncWebServerRequest* request);
  void on_reset(AsyncWebServerRequest* request);
  void on_state(AsyncWebServerRequest* request);
  void on_action(AsyncWebServerRequest* request);
  void on_connect(AsyncWebServerRequest* request, JsonVariant& json);

  void setup_wifi();
  void on_wifi_connected(const WiFiEventStationModeConnected& event);
  void on_wifi_disconnected(const WiFiEventStationModeDisconnected& event);
  void connect_wifi();

  void setup_mqtt();
  void on_mqtt_connect(bool session_present);
  void on_mqtt_disconnect(AsyncMqttClientDisconnectReason reason);
  void on_mqtt_subscribe(uint16_t packet_id, uint8_t qos);
  void on_mqtt_unsubscribe(uint16_t packet_id);
  void on_mqtt_message(char* topic, char* payload, AsyncMqttClientMessageProperties properties, size_t len, size_t index, size_t total);
  void on_mqtt_publish(uint16_t packet_id);
  void connect_mqtt();

  uint16_t subscribe_action();
  uint16_t publish_regist();
  uint16_t publish_state();
};

#endif