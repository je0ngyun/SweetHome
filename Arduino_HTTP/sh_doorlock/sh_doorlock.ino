#include <LittleFS.h>
#include <WiFiUdp.h>

WiFiUDP udp;
const int UDP_PORT = 4210;
IPAddress broadcastIp;

const String category = "1way Switch";
const int way = 1;
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
    delay(500);
    state[0] = false;
  } else {
    digitalWrite(RELAY_PIN, HIGH); // OFF
    delay(100);
  }
}
