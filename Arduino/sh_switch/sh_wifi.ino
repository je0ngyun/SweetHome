#include <ESP8266WiFi.h>

const String AP_NAME = "SweetHome";
const String AP_PASSWORD = "1234qwer";

String errorMessage;

bool connectWifi() {
  String ssid = eepromReadString(SSID_ADDRESS);
  String password = eepromReadString(PASSWORD_ADDRESS);
  Serial.print("WiFI 연결중");
    
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  int count = 0;
  int retry = 0;
  while (int status = WiFi.status() != WL_CONNECTED) {
    if (count < 30) {
      Serial.print(".");
      count++;
      delay(250);
    } else {
      retry++;
      if (retry == 3) {
        Serial.println(status);
        switch (status) {
          case 0:
            errorMessage = "";
            return false;
          case 1:
            errorMessage = "";
            return false;
          case 3:
            errorMessage = "연결되었습니다.";
            return false;
          case 6:
            errorMessage = "잘못된 비밀번호 입니다.";
            return false;
          default:
            return false;
        }
      }
      count = 0;
    }
  }
  Serial.println();
  Serial.println(ssid + " 네트워크 연결 완료");

  Serial.printf("Default hostname: %s\n", WiFi.hostname().c_str());

  Serial.print("IP 주소 : ");
  Serial.println(WiFi.localIP());
  
  return true;
}

void wifiSetup() {
  if (!connectWifi()) {
    WiFi.mode(WIFI_AP);
    WiFi.softAP(AP_NAME, AP_PASSWORD);
  }
}
