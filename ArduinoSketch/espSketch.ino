#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HCSR04.h>

// Gloabal var for current sensor data
volatile float currentDistance = 0.0;
String responseString="0.0";
// Pins Connecting to HC-SR04
const int trigPin = 23;
const int echoPin = 24;

// LED Pin Assignment
const int LED_PIN = LED_BUILTIN;

// WiFi Credentials
const char* ssid     = "RegularShow";
const char* password = "12345678";

AsyncWebServer server(80);
HCSR04 hc(trigPin, echoPin);

// Gets Distance and sends as Plian Text
void handleDistanceAPI(AsyncWebServerRequest *request) {
  request->sendHeader("Access-Control-Allow-Origin", "*");
  request->sendHeader("Access-Control-Allow-Origin", "GET");
  float distance = hc.dist();
  String distanceCM = String(distance, 2);
  request->send(200, "text/plain", responseString);
}

void setup() {
  Serial.begin(115200);
  delay(500);

// Connect to WiFi
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  pinMode(LED_PIN, OUTPUT);

  // CRITICAL: WAIT FOR CONNECTION
  int max_attempts = 20; // 20 second timeout
  while (WiFi.status() != WL_CONNECTED && max_attempts > 0) {
    digitalWrite(LED_PIN, HIGH); // Blink while connecting
    delay(250);
    digitalWrite(LED_PIN, LOW);
    delay(750);
    Serial.print(".");
    max_attempts--;

    server.on("/distance", HTTP_GET, handleDistanceAPI);
    server.begin();
    Serial.println("Server start");
  }

  // Final check and status report
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println(WiFi.localIP());
    digitalWrite(LED_PIN, HIGH); // Solid ON after connection
  } else {
    Serial.println("\nWiFi Failed to connect.");
    digitalWrite(LED_PIN, LOW); // Stay OFF on failure
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(LED_PIN, HIGH);
  }
  static unsigned long lastUpdate = 0;
  if(millis() - lastUpdate > 1000) {
    float newDistance = hc.dist();
    currentDistance = newDistance;
    responseString = String(currentDistance);
    lastUpdate = millis();
  }

// Distance in cm
  Serial.print("Distance ");
  Serial.print(hc.dist());
  Serial.println(" cm");
  delay(1500);
}