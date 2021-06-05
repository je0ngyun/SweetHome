#include "tplus_eeprom.h"
#include "EEPROM.h"

tplus_eeprom::tplus_eeprom() {
  EEPROM.begin(4096);
}

tplus_eeprom::~tplus_eeprom() {}

void tplus_eeprom::reset() {
  for (int i = 0; i < EEPROM.length(); i++) {
    EEPROM.write(i, 0);
  }

  EEPROM.commit();
}

void tplus_eeprom::write_string(int address, const String& str) {
  EEPROM.write(address, str.length());
  for (int i = 0; i < str.length(); i++) {
    EEPROM.write(address + 1 + i, str[i]);
  }

  EEPROM.commit();
}

String tplus_eeprom::read_string(int address) {
  int len = EEPROM.read(address);
  char buf[len + 1];

  for (int i = 0; i < len; i++) {
    buf[i] = EEPROM.read(address + 1 + i);
  }
  buf[len] = '\0';
  
  return String(buf);
}