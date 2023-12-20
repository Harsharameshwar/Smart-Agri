//---------------------------------------------------------------------------
//includes
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <stdlib.h>

// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);
//--------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------
//variable declarations
String values[5];
String dm = "";
String ms = "";
String v0 = "";
String v1 = "";
bool f=false;
//----------------------------------------------------------------------------------------------------------------------------
//String splitValues[5];
char c;
String content;
String dataIn;
const char* host = "mydesk.tk";
const int httpsPort = 7443;
// const char* endpoint = "/your_request_endpoint";

String serverName = "https://mydesk.tk:7443/";
const char* ssid = "WIFI NETWORK";
const char* password = "12345678";
//----------------------------------------------------------------------------------------------------------------------
//http variables
HTTPClient http;
// ---------------------------------------------------------------------------------------------------------------------
//wifi variables
WiFiClient client;
//-----------------------------------------------------------------------------------------------------------------------
//json variables
DynamicJsonDocument doc(1024);
//-----------------------------------------------------------------------------------------------------------------------
void setup() {

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Wire.begin(D1, D2, 8);
  Serial.begin(9600);

  Serial.println(WiFi.localIP());
 
  lcd.begin();
  lcd.setCursor(3, 0);
  lcd.print("Welcome to ");
  lcd.setCursor(3, 1);
  lcd.print("Smart-Agri");
}
//-----------------------------------------------------------------------------------------------------------------------------------

void loop() {
  if(!f){
smartagriwel();
  }
  receivedatafromarduino();
  delay(5000);
  if (dataIn != "") {
    senddatatoserver();
    delay(10000);
  }
  getdatafromserver();

  senddatatoarduino();
  f=true;
}

//--------------------------------------------------------------------------------------------------------------------------------------
void receivedatafromarduino() {
  Serial.println("hi");
  Wire.requestFrom(8, 26);
  /* request & read data of size 13 from slave */
  Serial.println(Wire.available());
  while (Wire.available()) {
    char c = Wire.read();
    if (c == 'v') {
      break;
    } else {
      dataIn += c;
    }
  }
  c = 0;
  splitString(dataIn);
  int rain = values[3].toInt();
  int soil = values[2].toInt();


  for (int i = 0; i < 5; i++) {
    Serial.print("Value ");
    Serial.print(i);
    Serial.print(": ");
    Serial.println(values[i]);
  }

  lcd.clear();
  lcd.setCursor(3, 0);
  lcd.print("Temperature:");
  lcd.setCursor(4, 1);
  lcd.print(values[0]);
  delay(2000);
  lcd.clear();
  lcd.setCursor(3, 0);
  lcd.print("Humidity:");
  lcd.setCursor(4, 1);
  lcd.print(values[1]);
  delay(2000);
  lcd.clear();
  lcd.setCursor(3, 0);
  lcd.print("Grid Voltage:");
  lcd.setCursor(4, 1);
  lcd.print(values[4]);
  delay(2000);
  if(soil<400){
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Soil Moisturous");
    delay(2000);
  }  

  else if(soil<600){
    lcd.clear();
    lcd.setCursor(0, 0); 
    lcd.print("Soil has");
    lcd.setCursor(0, 1); 
    lcd.print("Slight Moisture");
    delay(2000);
  }
  else if(soil>600){
    lcd.clear();
    lcd.setCursor(0, 0); 
    lcd.print("Soil has");
    lcd.setCursor(0, 1); 
    lcd.print("no Moisture");
    delay(2000);
  }   
  if(rain>600) {
    lcd.clear();
    lcd.setCursor(0, 0); 
    lcd.print("No Rain");
    delay(2000);
  }
  else {
    lcd.clear();
    lcd.setCursor(3, 0); 
    lcd.print("Rain is");
    lcd.setCursor(3, 1);
    lcd.print("Coming");
      delay(2000);
    }
    // Serial.println(values[2]);
    // delay(2000); 
    // Serial.println(values[3]);



    delay(1000);
  }

  void senddatatoserver() {

    // if (!client.connect(host, httpsPort)) {
    //   Serial.println("Connection failed");
    //   return;
    // }
    // Your Domain name with URL path or IP address with path
    // http.begin(client, serverName + "getsensordata/" + dataIn);

    // // Specify content-type header
    // http.addHeader("Content-Type", "application/json");
    // //    http.addHeader("method", "POST");
    // // Data to send with HTTP POST
    // Serial.println(dataIn);
    // String httpRequestData = dataIn;
    // // Send HTTP POST request
    // int httpResponseCode = http.POST(httpRequestData);
    // Serial.print("HTTP Response code: ");
    // Serial.println(httpResponseCode);

    // Free resources

    if ((WiFi.status() == WL_CONNECTED)) {

      std::unique_ptr<BearSSL::WiFiClientSecure> client(new BearSSL::WiFiClientSecure);

      // Ignore SSL certificate validation
      client->setInsecure();

      //create an HTTPClient instance
      HTTPClient https;

      //Initializing an HTTPS communication using the secure client
      Serial.print("[HTTPS] begin...\n");
      if (https.begin(*client, serverName + "getsensordata/1" + dataIn)) {  // HTTPS
        Serial.print("[HTTPS] GET...\n");
        // start connection and send HTTP header
        https.addHeader("Content-Type", "application/json");
        //    http.addHeader("method", "POST");
        // Data to send with HTTP POST
        Serial.println(dataIn);
      String httpRequestData = dataIn;
      // Send HTTP POST request
      int httpResponseCode = https.POST(httpRequestData);
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);

      // httpCode will be negative on error
      // if (httpCode > 0) {
      //   // HTTP header has been send and Server response header has been handled
      //   Serial.printf("[HTTPS] GET... code: %d\n", httpCode);
      //   // file found at server
      //   if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
      //     payload = https.getString();
      //     Serial.println(payload);
      //   }
      // } else {
      //   Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
      // }

      https.end();
    } else {
      Serial.printf("[HTTPS] Unable to connect\n");
    }
  }
  // Serial.println();
  // Serial.println("Waiting 2min before the next round...");
  http.end();
  dataIn = "";
}
void getdatafromserver() {
  if ((WiFi.status() == WL_CONNECTED)) {

    std::unique_ptr<BearSSL::WiFiClientSecure> client(new BearSSL::WiFiClientSecure);

    // Ignore SSL certificate validation
    client->setInsecure();

    //create an HTTPClient instance
    HTTPClient https;

    //Initializing an HTTPS communication using the secure client
    Serial.print("[HTTPS] begin...\n");
    if (https.begin(*client, serverName + "senddata2/1")) {  // HTTPS
      Serial.print("[HTTPS] GET...\n");
      // start connection and send HTTP header
      int httpCode = https.GET();
      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTPS] GET... code: %d\n", httpCode);
        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          content = https.getString();
          Serial.println(content);
        }
      } else {
        Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
      }

      https.end();
      Serial.println("get data");
      Serial.println(content);
      splitStringDevice(content);
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Device Mode:");
      lcd.setCursor(4, 1);
      lcd.print(dm);
      delay(2000);
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Motor Status:");
      lcd.setCursor(4, 1);
      lcd.print(ms);
      delay(2000);
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Valve 1:");
      lcd.setCursor(4, 1);
      lcd.print(v0);
      delay(2000);
      lcd.clear();
      lcd.setCursor(3, 0);
      lcd.print("Valve 2:");
      lcd.setCursor(4, 1);
      lcd.print(v1);
      delay(2000);

    } else {
      Serial.printf("[HTTPS] Unable to connect\n");
    }
  }
}
// void getdatafromserver() {
//   http.begin(client, serverName + "senddata2/1");
//   http.GET();
//   content = http.getString();
//   http.end();
//   Serial.println("get data");
//   Serial.println(content);


// }

void senddatatoarduino() {
  Serial.println("lo");
  Wire.beginTransmission(8);
  Serial.println(content);     /* begin with device address 8 */
  Wire.write(content.c_str()); /* sends hello string */
  Wire.endTransmission();      /* stop transmitting */
}





void splitString(String input) {

  int startIndex = 0;  // Start index for each substring
  int arrayIndex = 0;  // Index to store the values in the array

  for (int i = 0; i < input.length(); i++) {
    if (input.charAt(i) == 't' || input.charAt(i) == 'h' || input.charAt(i) == 's' || input.charAt(i) == 'r') {
      values[arrayIndex] = input.substring(startIndex, i);  // Store the substring in the array
      arrayIndex++;                                         // Increment the array index
      startIndex = i + 1;                                   // Update the start index for the next substring
    }
  }

  values[arrayIndex] = input.substring(startIndex);  // Store the last substring after the last delimiter

  //Print the split values
  for (int i = 0; i < 5; i++) {
    Serial.print("Value ");
    Serial.print(i);
    Serial.print(": ");
    Serial.println(values[i]);
  }
  values[arrayIndex] = input.substring(startIndex);  // Store the last substring after the last delimiter

  // Return the array
}

void splitStringDevice(String inputString) {
  String splitPoints[4] = { "dm", "ms", "v0", "v1" };
  String substrings[8];
  int numSubstrings = 0;
  int startIndex = 0;
  for (int i = 0; i < 4; i++) {
    int splitIndex = inputString.indexOf(splitPoints[i]);
    if (splitIndex != -1) {
      substrings[numSubstrings++] = inputString.substring(startIndex, splitIndex);
      substrings[numSubstrings++] = splitPoints[i];
      startIndex = splitIndex + splitPoints[i].length();
    }
  }
  substrings[numSubstrings++] = inputString.substring(startIndex);

  dm = substrings[0];
  ms = substrings[2];
  v0 = substrings[4];
  v1 = substrings[6];
}

void smartagriwel(){
  lcd.setCursor(3, 0);
  lcd.print("Welcome to ");
  lcd.setCursor(3, 1);
  lcd.print("Smart-Agri");  
delay(5000);  
}