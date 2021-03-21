int relayPin = 3;
char on = '0';

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(relayPin, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
    on = Serial.read();
  }
  if (on == '1') {
    digitalWrite(relayPin, HIGH);
    delay(100);
  } else if (on == '0') {
    digitalWrite(relayPin, LOW);
    delay(100);
  }
}
