#include <LittleFS.h>
#include <WiFiUdp.h>

WiFiUDP udp;
const int UDP_PORT = 4210;
IPAddress broadcastIp;

const String category = "1way Switch";
const int way = 4;
bool state[way] = { false, };
const int RELAY_PIN[way] = { D4, D5, D6, D7 };

void setup() {
  Serial.begin(115200);
  if(!LittleFS.begin()) {
    Serial.println("LittleFS 오류");
    return;
  }
  eepromSetup();
  wifiSetup();
  serverSetup();
  for (int i = 0; i < way; i++) {
    pinMode(RELAY_PIN[i], OUTPUT);
  }
  
}

void loop() {
  for (int i = 0; i < way; i++) {
    if (state[i]) {
      digitalWrite(RELAY_PIN[i], LOW); // ON
      delay(100);
    } else {
      digitalWrite(RELAY_PIN[i], HIGH); // OFF
      delay(100);
    }
  }
}
