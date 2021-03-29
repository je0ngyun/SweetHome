#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>

AsyncWebServer server(80);

void serverSetup() {
  server.on("/html", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200,  "text/html", "<p>SweetHome!!</p>");
  });
  
  server.serveStatic("/", LittleFS, "/www/").setDefaultFile("index.html");
  server.serveStatic("/scripts/", LittleFS, "/www/scrpits/");

  server.begin();
}
