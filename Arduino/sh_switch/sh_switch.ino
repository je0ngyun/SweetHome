#include <LittleFS.h>

<<<<<<< HEAD
const int way = 2;
=======
const String category = "1way Switch";
const int way = 1;
>>>>>>> 2fa76fc84998b88078626ab2b60af4bd445ba09a
bool state[way] = { false, };
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
