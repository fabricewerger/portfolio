#include <Servo.h>

Servo motor1;
Servo motor2;
Servo motor3; 
Servo motor4;
Servo motor5;
Servo motor6;


#define STARTPOS  130
#define KISSPOS   80
#define KISSSPD   40
#define KISSAFTER 1000

#define STARTPOS2 0
#define KISSPOS2  10
#define STARTPOS3 10
#define KISSPOS3  20
#define KISSTURN1 95
#define KISSTURN2 72
#define KISSSTOP  92
#define KISSWAIT  200
#define KISSDRAAI 1500
  
#define FANPIN    9
#define HEATPIN   12
#define SERVOPIN1 6   //b1
#define SERVOPIN2 11  //b2
#define SERVOPIN3 2   //z1
#define SERVOPIN4 4   //z2
#define SERVOPIN5 3   //b3
#define SERVOPIN6 5   //b4

int  curPress = 0;
bool  prvPress = false;
bool  runLoop  = false;

unsigned long prvKiss = 0UL;
unsigned long nxtKiss = 0UL;

unsigned long heatofftime = 0UL;
unsigned long heatontime = 0UL;



void setup() {
  Serial.begin(115200);
  pinMode(FANPIN, OUTPUT);
  pinMode(HEATPIN, OUTPUT);
  pinMode(SERVOPIN1, OUTPUT);
  pinMode(SERVOPIN2, OUTPUT);
  pinMode(SERVOPIN3, OUTPUT);
  pinMode(SERVOPIN4, OUTPUT);
  pinMode(SERVOPIN5, OUTPUT);
  pinMode(SERVOPIN6, OUTPUT);

  motor1.attach(SERVOPIN1); //blauw1
  motor1.write(STARTPOS);
  motor2.attach(SERVOPIN2); //blauw2
  motor2.write(STARTPOS);
  motor3.attach(SERVOPIN3); //zwart1
  motor4.attach(SERVOPIN4); //zwart2
  motor5.attach(SERVOPIN5); //blauw3
  motor5.write(STARTPOS2);
  motor6.attach(SERVOPIN6); //blauw4
  motor6.write(STARTPOS2);    
  prvKiss = millis();
  nxtKiss = prvKiss;
}

void loop() {
  Serial.println(runLoop);
  button();
  if (runLoop) {
    if (millis() - heatofftime > 15000UL) {
       digitalWrite(HEATPIN, HIGH);
       heatontime = millis();  
    }
    if (millis() - heatontime > 5000UL) {
      digitalWrite(HEATPIN, LOW);
      heatofftime = millis(); 
    }
    if (millis() - prvKiss > nxtKiss) {
      Serial.println(nxtKiss);
      int rnd = random(1,5);
      switch (rnd) {
        case 1:
          doKiss1();
          break;
        case 2:
          doKiss2();
          break;
        case 3:
          doKiss3();
          break;
        case 4:
          doKiss4();
          break;
        default:
          break;
      }  
      
      nxtKiss = (unsigned long) random(3000, 5000);
      Serial.println(nxtKiss);
      prvKiss = millis();
    }
  }
}


void button() { 
  curPress = analogRead(A0);
  if ( curPress < 200 ) {
    if (prvPress == true) {
      runLoop = !runLoop;
      if (runLoop == true) {
        digitalWrite(FANPIN, HIGH);
        digitalWrite(HEATPIN, HIGH);
        heatontime = millis();
      } else {
        digitalWrite(FANPIN, LOW);
        digitalWrite(HEATPIN, LOW);
        heatofftime = millis();
      }
      prvPress = false;
    } else {
      
    }
  } else {
    prvPress = true;
  }
}


void doKiss1() {
  for(int i = STARTPOS; i >= KISSPOS; i = i-1){
        motor1.write(i);
          delay(KISSSPD);
        }
      delay(KISSAFTER);
      motor1.write(STARTPOS);
}

void doKiss2() {
  for(int i = STARTPOS; i >= KISSPOS; i = i-1){
        motor2.write(i);
          delay(KISSSPD);
        }
      delay(KISSAFTER);
      motor2.write(STARTPOS);
}

void doKiss3() {
   for(int i = STARTPOS2; i >= KISSPOS2; i = i-1){
         delay(KISSWAIT);
        }
      motor3.write(KISSTURN1);
          delay(KISSDRAAI);
      motor3.write(KISSTURN2);
          delay(KISSDRAAI);
      motor3.write(KISSSTOP);
          delay(KISSWAIT);
}

void doKiss4() {
   for(int i = STARTPOS3; i >= KISSPOS3; i = i-1){
         delay(KISSWAIT);
        }
      motor4.write(KISSTURN1);
          delay(KISSDRAAI);
      motor4.write(KISSTURN2);
          delay(KISSDRAAI);
      motor4.write(KISSSTOP);
          delay(KISSWAIT);
}
