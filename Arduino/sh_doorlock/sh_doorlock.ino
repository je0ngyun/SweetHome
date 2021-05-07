#include <LittleFS.h>

const int SPEED_PIN = D2;
const int DIR_PIN1 = D3;
const int DIR_PIN2 = D4;

const int way = 1;
bool state[way] = { false, };
bool is_stop = false;

void setup() {
  Serial.begin(115200);
  if(!LittleFS.begin()) {
    Serial.println("LittleFS 오류");
    return;
  }
  eepromSetup();
  wifiSetup();
  serverSetup();
  pinMode(SPEED_PIN, OUTPUT);
  pinMode(DIR_PIN1, OUTPUT);
  pinMode(DIR_PIN2, OUTPUT);
}

void open() {
  unsigned long start = millis();
  unsigned long now = start;
  digitalWrite(DIR_PIN1, HIGH);
  digitalWrite(DIR_PIN2, LOW);
  analogWrite(SPEED_PIN, 255);
  while (now - start <= 1500) {
    now = millis();
  }
  stop();
  state[0] != state[0];
}

void stop() {
  analogWrite(SPEED_PIN, 0);
  is_stop = true;
}

void close() {
  unsigned long start = millis();
  unsigned long now = start;
  digitalWrite(DIR_PIN1, LOW);
  digitalWrite(DIR_PIN2, HIGH);
  analogWrite(SPEED_PIN, 255);
  while (now - start <= 1800) {
    now = millis();
  }
  stop();
  state[0] != state[0];
}

void loop() {
  if (state[0] && !is_stop) {
    Serial.println("열림");
    close();
  } else if (!state[0] && !is_stop) {
    Serial.println("닫힘 ");
    open();
  }
}
