#include <LittleFS.h>

const String category = "2way Switch";
const int way = 2;
bool state[way] = { false, false };
const int RELAY_PIN = 14;

void setup() {
  Serial.begin(115200);
  if(!LittleFS.begin()) {
    Serial.println("LittleFS 오류");
    return;
  }
  eepromSetup();
  wifiSetup();
  serverSetup();
  pinMode(RELAY_PIN, OUTPUT);
}

void loop() {
  if (state[0] == true) {
    digitalWrite(RELAY_PIN, LOW); // ON
    delay(100);
  } else {
    digitalWrite(RELAY_PIN, HIGH); // OFF
    delay(100);
  }
}
