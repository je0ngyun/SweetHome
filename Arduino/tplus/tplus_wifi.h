#ifndef TPLUS_WIFI_H
#define TPLUS_WIFI_H

#include "Arduino.h"
#include "WiFiUdp.h"

class tplus_wifi {
public:
  tplus_wifi();
  ~tplus_wifi();
  void setup(const String& ssid, const String& password);

  IPAddress get_local_ip();
  IPAddress get_broker_ip();

  String get_host_name();
private:
  const String AP_NAME_ = "10plus";
  const String AP_PASSWORD_ = "1234qwer";
  WiFiUDP udp_;
  const int UDP_PORT_ = 4210;
  IPAddress broker_ip_;

  bool connect(const String& ssid, const String& password);
};

#endif
