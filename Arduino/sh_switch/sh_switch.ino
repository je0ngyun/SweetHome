#include <LittleFS.h>

const String category = "2way Switch";
const int way = 2;
bool state[way] = { false, false };

void setup() {
  Serial.begin(115200);
  if(!LittleFS.begin()) {
    Serial.println("LittleFS 오류");
    return;
  }
  eepromSetup();
  wifiSetup();
  serverSetup();
}

void loop() {
  
}
