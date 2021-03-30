#include <ESP8266WiFi.h>

const String AP_NAME = "SweetHome";
const String AP_PASSWORD = "1234qwer";

bool connectWifi() {
  String ssid = eepromReadString(SSID_ADDRESS);
  String password = eepromReadString(PASSWORD_ADDRESS);

  WiFi.begin(ssid, password);

  while (int status = WiFi.status() != WL_CONNECTED) {
    if (status == 1) // SSID를 찾을 수 없음
      return false;
    else if (status == 6) // 비밀번호가 일치 하지 않음
      return false;
  }
  
  return true;
}

void wifiSetup() {
  if (!connectWifi()) {
    WiFi.softAP(AP_NAME, AP_PASSWORD);
  }
}
