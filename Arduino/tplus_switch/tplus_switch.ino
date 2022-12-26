#include <tplus.h>

tplus app;

void setup() {
  app.add_switch(14);
  app.setup();
}

void loop() {
  for (auto p : app.get_switchs()) {
    if (p.second) {
      digitalWrite(p.first, LOW);
      delay(100);
    } else {
      digitalWrite(p.first, HIGH);
      delay(100);
    }
  }
}
