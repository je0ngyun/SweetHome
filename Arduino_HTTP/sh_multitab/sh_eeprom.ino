#include <EEPROM.h>

#define SSID_ADDRESS 0
#define PASSWORD_ADDRESS 33

void eepromSetup() {
  EEPROM.begin(4096);
}

void eepromReset() {
  for (int i = 0; i < EEPROM.length(); i++) {
    EEPROM.write(i, 0);
  }
  EEPROM.commit();
}

void eepromWriteString(int address, const String& str) {
  EEPROM.write(address, str.length());
  
  for (int i = 0; i < str.length(); i++) {
    EEPROM.write(address + 1 + i, str[i]);
  }
}

String eepromReadString(int address) {
  int len = EEPROM.read(address);
  char buf[len + 1];

  for (int i = 0; i < len; i++) {
    buf[i] = EEPROM.read(address + 1 + i);
  }
  buf[len] = '\0';
  
  return String(buf);
}
