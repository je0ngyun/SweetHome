#include <ESP8266WiFi.h>

const String AP_NAME = "SweetHome";
const String AP_PASSWORD = "1234qwer";

bool connectWifi() {
  String ssid = eepromReadString(SSID_ADDRESS);
  String password = eepromReadString(PASSWORD_ADDRESS);

  WiFi.begin(ssid, password);

  while (int status = WiFi.status() != WL_CONNECTED) {
    if (status == 6)
      return false;
  }
  
  return true;
}

void wifiSetup() {
  if (!connectWifi()) {
    WiFi.softAP(AP_NAME, AP_PASSWORD);
  }
}
