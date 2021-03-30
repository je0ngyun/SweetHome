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
}

void eepromWriteString(int address, String str) {
  EEPROM.write(address, str.length());
  
  for (int i = 0; i < str.length(); i++) {
    EEPROM.write(address + 1 + i, str[i]);
  }
}

String eepromReadString(int address) {
  int len = EEPROM.read(address);
  char buf[len];

  for (int i = 0; i < len; i++) {
    buf[i] = EEPROM.read(address + 1 + i);
  }

  return String(buf);
}
