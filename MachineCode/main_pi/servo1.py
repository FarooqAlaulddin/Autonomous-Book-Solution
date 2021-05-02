# Servo1.py

import RPi.GPIO as GPIO
import time
import serial


ser = serial.Serial('/dev/ttyACM0',9600)    

global BEAM_PIN
global cellNum

P_SERVO = 11 # adapt to your wiring
fPWM = 50  # Hz (not higher with software PWM)
a = 10
b = 2

#for rotating the belt
def rotateBelt(cellNum):
    print("This is rotateBelt Method")
    #default servo will be set to first cell
    servoPIN = 22
    #then if the cell number is different it will change the servo
    if cellNum == 1:
        servoPIN = 22
    elif cellNum == 2:
        servoPIN = 23
    elif cellNum == 3:
        servoPIN = 24
    elif cellNum == 4:
        servoPIN = 25
    elif cellNum == 5:
        servoPIN = 26
    elif cellNum == 6:
        servoPIN = 27
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(servoPIN, GPIO.OUT)
    p = GPIO.PWM(servoPIN, 50) # GPIO number for PWM with 50Hz
    p.start(2.5) # Initialization
    try:
        p.ChangeDutyCycle(10)
        time.sleep(2.5)
    except KeyboardInterrupt:
      p.stop()
      GPIO.cleanup()
    print("Rotate Belt Finished")
    
    return True

#for moving the sliders
#move from cells to default
def firstDef():
    toArdunio = "5"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "1"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left
    toArdunio = "4"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left 
    toArdunio = "4"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True
def secondDef():
    toArdunio = "5"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "1"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left
    toArdunio = "4"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True
    
def thirdDef():
    toArdunio = "5"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "1"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "1"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left
    toArdunio = "4"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left 
    toArdunio = "4"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True
def fourthDef():
    toArdunio = "5"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "1"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "1"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left
    toArdunio = "4"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True

def fifthDef():
    toArdunio = "5"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "1"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "1"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True

def sixthDef():
    toArdunio = "5"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "1"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True
    
#moving to cells 
def firstCell():
    toArdunio = "6"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "2"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left
    toArdunio = "3"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left 
    toArdunio = "3"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True

def secondCell():
    toArdunio = "6"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "2"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left
    toArdunio = "3"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True
    
def thirdCell():
    toArdunio = "6"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "2"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "2"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left
    toArdunio = "3"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left 
    toArdunio = "3"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True

def fourthCell():
    toArdunio = "6"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "2"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "2"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move left
    toArdunio = "3"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True

def fifthCell():
    toArdunio = "6"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "2"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "2"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True

def sixthCell():
    toArdunio = "6"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    #move down
    toArdunio = "2"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    return True
    
def activateSliders(activate,cellNumber):
    #call sliders and move the tray to the checkout window
    toArdunio = "0"
    toArdunioEncode = toArdunio.encode()
    ser.write(toArdunioEncode)
    
    confirm = False
    while True:
        if(ser.in_waiting>0):
            writeback = ser.readline()
            print(writeback)
            if  activate == 0:
                if cellNumber == 1:
                    confirm = firstCell()
                elif cellNumber == 2:
                    confirm=secondCell()
                elif cellNumber == 3:
                    confirm=thirdCell()
                elif cellNumber == 4:
                    confirm=fourthCell()
                elif cellNumber == 5:
                    confirm=fifthCell()
                elif cellNumber == 6:
                    confirm=sixthCell()
            elif activate ==1:
                if cellNumber == 1:
                    confirm = firstDef()
                elif cellNumber == 2:
                    confirm=secondDef()
                elif cellNumber == 3:
                    confirm=thirdDef()
                elif cellNumber == 4:
                    confirm=fourthDef()
                elif cellNumber == 5:
                    confirm=fifthDef()
                elif cellNumber == 6:
                    confirm=sixthDef()

                #vertical: 1 moves up and two ,
    #                        2 moves down
    #           #  toArdunio = "2"
    #             toArdunioEncode = toArdunio.encode()
    #             ser.write(toArdunioEncode)
#             
#             #horizontal: 3 moves left
#             #            4 moves right
#          #   toArdunio = "3"
#             toArdunioEncode = toArdunio.encode()
#             ser.write(toArdunioEncode)
            
            toArdunio = "0"
            toArdunioEncode = toArdunio.encode()
            ser.write(toArdunioEncode)
            break
    time.sleep(15)
    return confirm

#for opening tray door
def setDirection(direction):
    global flag
    
#     try:
    GPIO.cleanup()
#     except:
#         print("Cleanup error")
        
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(P_SERVO, GPIO.OUT)
    pwm = GPIO.PWM(P_SERVO, fPWM)
    pwm.start(0)
    duty = a / 180 * direction + b
    pwm.ChangeDutyCycle(duty)
    print ("direction =", direction, "-> duty =", duty)
    if duty == 12:
       # time.sleep(0.5) # allow to settle
        time.sleep(0.29) # Door Open
        flag = 1
    else :
        #time.sleep(0.59) # allow to settle
        time.sleep(0.56) # Door Close


#for checkout window sensors confirming book landed on checkout window or not
# def break_beam_callback(channel):
#     global flag
#     BEAM_PIN = 26
#     if GPIO.input(BEAM_PIN)==False:
#         print("beam broken")
#         print("book Landed on checkout window")
#     else :
#         print("beam unbroken")
#         print("Book Picked up")
#         bookConf== True 
#         GPIO.remove_event_detect(channel)
            
# def confLanding(cellN):
#     global cellNum
#     cellNum = cellN
#     BEAM_PIN = 27
#     
#     while bookConf== False:
#         time.sleep(10)
#         print("running till book is dropped in window")
#         
#     if bookConf == True:
#         BEAM_PIN = 26
#         bookConf == False
#         print ("Starting Checkout Window sensors ")
#         GPIO.setmode(GPIO.BCM)
#         GPIO.setup(BEAM_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
#         GPIO.add_event_detect(BEAM_PIN, GPIO.BOTH, callback=break_beam_callback)
#     while bookConf== False:
#         time.sleep(10)
#         print("running till book is picked up by user")
#     
#     GPIO.cleanup()
#         
#     return bookConf
