#ifndef TPLUS_H
#define TPLUS_H

#include <utility>
#include <vector>

#include "Arduino.h"
#include "ESPAsyncWebServer.h"

#include "tplus_eeprom.h"
#include "tplus_wifi.h"

using namespace std;

class tplus {
public:
  tplus();
  ~tplus();
  void setup();
private:
  tplus_eeprom eeprom_;
  tplus_wifi wifi_;
  AsyncWebServer web_server_;

  vector<pair<int, bool>> switch_;
};

#endif