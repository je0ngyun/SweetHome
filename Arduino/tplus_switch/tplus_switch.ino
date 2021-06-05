#include <tplus.h>
#include <utility>

tplus app;

void setup() {
  pinMode(13, OUTPUT);
  app.setup();
  std::pair<int, int> p(1, 2);
}

void loop() {
  digitalWrite(13, !(digitalRead(13)));
  delay(500);
}
