//---------------------------------------------------------------------------
//includes
#include <DFRobot_DHT11.h>
#include <Wire.h>
#include "ACS712.h"

//---------------------------------------------------------------------------
//pin declarations
//4 analog sensors
//1 digital sensor
//-----------------------------------------------
//analog pin def
#define zmptpin A0
#define soilpin A1
#define rainpin A2
#define asc712pin A3
//--------------------------------------------------------
//digital pin def
#define temphumi 2
#define borewellonpin 3
#define v0pin 4
#define v1pin 5
//------------------------------------------------------
//------------------------------------------------------
//ACS712

ACS712  ACS(A3, 5.0, 1023, 66);



//------------------------------------------------------

//variable declarations
bool f = false;
//---------------------------------------------
//zmpt101B variables
double sensorValue1 = 0;
double sensorValue2 = 0;
int crosscount = 0;
int climb_flag = 0;
int val[100];
int max_v = 0;
double VmaxD = 0;
double VeffD = 0;
double Veff = 0;
//------------------------------------------------
//soil moisture variable
int soilmoisture = 0;
//--------------------------------------------------------------------------------------------------
//rain sensor variables
int rainsensor = 0;
//--------------------------------------------------------------------------------------------------
//temphumi variables
float temprature = 0.0;
int humi = 0;
DFRobot_DHT11 DHT;

//--------------------------------------------------------------------------------------------------
//asc712 variables (motor currenct )
double mA=0;
//--------------------------------------------------------------------------------------------------
//data variables
String dataIn = "";


//--------------------------------------------------------------------------------------------------
//euipment status varibales
String dm = "";
String ms = "";
String v0 = "";
String v1 = "";
String dm1 = "";
String ms1 = "";
String v01 = "";
String v11 = "";
//--------------------------------------------------------------------------------------------------
String datatosend = "";
//--------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------
void setup() {
  //--------------------------------------------------------------------------------------------------
  //pinmode definations
  pinMode(zmptpin, INPUT);
  pinMode(soilpin, INPUT);
  pinMode(rainpin, INPUT);
  // pinMode(asc712pin, INPUT);
  pinMode(borewellonpin, OUTPUT);
  pinMode(v0pin, OUTPUT);
  pinMode(v1pin, OUTPUT);
  //----------------------------------------------------------------------------------------------------
  //setting default values for operational pins
  digitalWrite(v0pin, HIGH);
  digitalWrite(v1pin, HIGH);
  digitalWrite(borewellonpin, HIGH);
  //----------------------------------------------------------------------------------------------------
  Serial.begin(9600);
  //----------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------
  // ACS712
  Serial.print("ACS712_LIB_VERSION: ");
  Serial.println(ACS712_LIB_VERSION);

  ACS.autoMidPoint();
  Serial.print("MidPoint: ");
  Serial.println(ACS.getMidPoint());
  Serial.print("Noise mV: ");
  Serial.println(ACS.getNoisemV());

  //----------------------------------------------------------------------------------------------------  

  //I2c coomunication init
  Wire.begin(8);                /* join i2c bus with address 8 */
  Wire.onReceive(receiveEvent); /* register receive event */
  Wire.onRequest(requestEvent);
}

//---------------------------------------------------------------------------------------------------------------------------------------------------

void loop() {

  findgridstatus();
  delay(1000);
  getrainvalue();
  delay(1000);
  gettemphumivalue();
  delay(1000);
  getsoilvalue();
  delay(1000);

  if (!f) {
    Serial.println(dm);
    dm1 = dm;
    ms1 = ms;
    v01 = v0;
    v11 = v1;
    if (dm != " ") {
      if (dm == "auto") {
        Serial.println("llllll");
        handelautomation();
        f = true;
      } else {
        //    mannual turning on and off of motor comes here
        Serial.println("loosmds");
        handelmannual();
        f = true;
      }
    }
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
//functions to handle sensors

void findgridstatus() {
  for (int i = 0; i < 100; i++) {
    sensorValue1 = analogRead(zmptpin);
    if (analogRead(A0) > 511) {
      val[i] = sensorValue1;
    } else {
      val[i] = 0;
    }
    delay(1);
  }

  max_v = 0;

  for (int i = 0; i < 100; i++) {
    if (val[i] > max_v) {
      max_v = val[i];
    }
    val[i] = 0;
  }
  if (max_v != 0) {


    VmaxD = max_v;
    VeffD = VmaxD / sqrt(2);
    Veff = (((VeffD - 420.76) / -90.24) * -210.2) + 210.2;
  } else {
    Veff = 0;
  }
  Serial.print("Voltage: ");
  Serial.println(Veff);
  VmaxD = 0;

  delay(100);
}

void gettemphumivalue() {
  DHT.read(temphumi);
  Serial.print("Temperature:");
  temprature = DHT.temperature;
  Serial.print(temprature);
  Serial.print(" Humidity:");
  humi = DHT.humidity;
  Serial.println(humi);
}

void getrainvalue() {
  int rain = analogRead(rainpin);
  Serial.print(" Rain:");
  rainsensor = rain;
  Serial.println(rain);
}

void getsoilvalue() {
  int soil = analogRead(soilpin);
  Serial.print(" soil:");
  soilmoisture = soil;
  Serial.println(soil);

}
void checkmotorstatus() {
  //here acs712 code comes
  float average = 0;
  uint32_t start = millis();
  for (int i = 0; i < 100; i++)
  {
    //  select sppropriate function
    //  average += ACS.mA_AC_sampling();
    average += ACS.mA_AC();
  }
  float mA = average / 100.0;
  uint32_t duration = millis() - start;
  // Serial.print("Time: ");
  // Serial.print(duration);
  Serial.print("  mA: ");
  Serial.println(mA);

  delay(1000);
}


//-----------------------------------------------------------------------------------------------------------------------------------
//function to receive data from node
void receiveEvent(int howMany) {
  while (0 < Wire.available()) {
    char c = Wire.read();
    /* receive byte as a character */
    if (c == '}') {
      break;
    } else {
      dataIn += c;
    }
    Serial.print(c); /* print the character */
  }
  //  Serial.println();

  /* to newline */
  splitString(dataIn);
  checkhaschanged();
  dataIn = "";
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// function that executes whenever data is requested from master
void requestEvent() {

  String ss = (String)temprature + "t" + (String)humi + "h" + (String)soilmoisture + "s" + (String)rainsensor + "r" + (String)Veff + "v";

  Wire.write(ss.c_str());
  /*send string on request */
}

//-------------------------------------------------------------------------------------------------------------------------------------------
//function to handle automation of the device
void handelautomation() {
  Serial.println("Auto Mode Activated");
  if (soilmoisture >= 800) {
    if (Veff > 200) {
      Serial.println("hello");
          handelv1open();
            motoron();
      delay(6000);  // make using millis() after some time
    } else {
      motoroff();
    }
  }

  else {
    motoroff();
  }
}


//----------------------------------------------------------------------------------------------------------
//function to handle mannual  operation of the device
void handelmannual() {
  Serial.println("Manual");
  if (ms == "on") {
    Serial.println("MOTOR ON");
    motoron();
  } else {
    motoroff();
  }
  if (v0 == "on") {
    handelv1open();
  } else {
    handelv1close();
  }
  if (v1 == "on") {
    handelv2open();
  } else {
    handelv2close();
  }
}
//-----------------------------------------------------------------------------------------------
//function to check weather anything has changed from server req
void checkhaschanged() {
  Serial.println(dm + " " + ms + " " + dm1 + " " + ms1);
  if (dm1 != dm) {
    f = false;
    motoroff();
  } else if (ms1 != ms) {
    f = false;
  } else if (v01 != v0) {
    f = false;
  } else if (v11 != v1) {
    f = false;
  }
}
//-------------------------------------------------------------------------------------------------------
//functions to turn on and off

void motoron() {
  Serial.println("MOTOR On");
  digitalWrite(borewellonpin, LOW);
}
void motoroff() {
  Serial.println("Motor OFF");
  digitalWrite(borewellonpin, HIGH);
}
void handelv1open() {
  digitalWrite(v0pin, LOW);
}
void handelv1close() {
  digitalWrite(v0pin, HIGH);
}
void handelv2open() {
  digitalWrite(v1pin, LOW);
}
void handelv2close() {
  digitalWrite(v1pin, HIGH);
}
//-----------------------------------------------------------------------------------------------------------
//Utils
//-------------------------------------------------------------------------------------------------------------
// function to sperate the strings
void splitString(String inputString) {
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
