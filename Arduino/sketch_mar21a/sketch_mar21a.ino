#include <IRremote.h>

int relayPin = 3;
int IRpin = 4;
char on = '0';

IRrecv irrecv(IRpin);
decode_results results;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(relayPin, OUTPUT);
  irrecv.enableIRIn();
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
    on = Serial.read();
  }
  if (irrecv.decode()) {
    Serial.println(results.value);

    irrecv.resume();
  }
  if (on == '1') {
    digitalWrite(relayPin, HIGH);
    delay(100);
  } else if (on == '0') {
    digitalWrite(relayPin, LOW);
    delay(100);
  }
}
