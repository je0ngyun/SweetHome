#ifndef TPLUS_EEPROM_H
#define TPLUS_EEPROM_H

#include "Arduino.h"

class tplus_eeprom {
public:
  tplus_eeprom();
  ~tplus_eeprom();

  void reset();
  void write_string(int address, const String& str);
  String read_string(int address);

  const static int SSID_ADDRESS = 0;
  const static int PASSWORD_ADDRESS = 33;
};

#endif