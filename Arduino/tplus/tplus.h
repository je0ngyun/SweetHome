#ifndef TPLUS_H
#define TPLUS_H

#include <utility>
#include <vector>

#include "Arduino.h"
#include "ESPAsyncWebServer.h"
#include "AsyncMqttClient.h"

#include "tplus_eeprom.h"
#include "tplus_wifi.h"

using namespace std;

class tplus {
public:
  tplus();
  ~tplus();
  void setup();
  void add_switch(int pin);
  const vector<pair<int, bool>>& get_switchs();
private:
  tplus_eeprom eeprom_;
  tplus_wifi wifi_;
  AsyncWebServer web_server_;

  IPAddress broker_ip_;
  AsyncMqttClient mqtt_client_;

  vector<pair<int, bool>> switch_;

  void onMqttConnect(bool session_present);
};

#endif