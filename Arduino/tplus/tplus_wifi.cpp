#include "tplus_wifi.h"
#include "ESP8266WiFi.h"

tplus_wifi::tplus_wifi() {}

tplus_wifi::~tplus_wifi() {}

void tplus_wifi::setup(const String& ssid, const String& password) {
  if (!connect(ssid, password)) {
    WiFi.mode(WIFI_AP);
    WiFi.softAP(AP_NAME_ + " - " + WiFi.hostname(), AP_PASSWORD_);
  }
}

bool tplus_wifi::connect(const String& ssid, const String& password) {
  udp_.begin(UDP_PORT_);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  int count = 0;
  int retry = 0;
  String errorMessage;
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

  IPAddress broadcastIp = WiFi.localIP();
  broadcastIp[3] = 255;

  udp_.beginPacket(broadcastIp, UDP_PORT_);
  udp_.print(WiFi.hostname().c_str());
  udp_.endPacket();

  int packet_size;
  count = 0;
  while (!(packet_size = udp_.parsePacket())) {
    Serial.print(".");
  }
  Serial.println();
  broker_ip_ = udp_.remoteIP();

  return true;
}

IPAddress tplus_wifi::get_local_ip() {
  return WiFi.localIP();
}

IPAddress tplus_wifi::get_broker_ip() {
  return broker_ip_;
}

String tplus_wifi::get_host_name() {
  return WiFi.hostname();
}