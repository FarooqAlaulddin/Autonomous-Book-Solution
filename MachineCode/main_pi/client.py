import socket
import servo1
import time
import RPi.GPIO as GPIO

def main(cellNum):
    HOST = '192.168.1.98' #Server IP Adderss
    PORT = 2025 #Should be same as Server Port

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST, PORT))

    beltRotated = False
    default = False
    notAgain = False

    while True:
        
        data = s.recv(1024)
        reply = data.decode("utf-8")
        print (reply)
        if reply == "Unbroken" and notAgain == False: 
            beltRotated = servo1.rotateBelt(cellNum)
            time.sleep(3)
        
#         if beltRotated == True:
#             #Recieving data from sensors
#             data = s.recv(1024)
#             reply = data.decode("utf-8")
#             print (reply)
            
        if reply == "Broken" and notAgain == False:
            default = servo1.activateSliders(1, cellNum)
            notAgain = True
            if cellNum == 3 or cellNum == 4:
                time.sleep(4)
                
            if default == True:
                print ("Opening DOOR")
                servo1.setDirection(180)
                GPIO.cleanup()
                servo1.setDirection(180)
                GPIO.cleanup()
                print ("Door Opened")
                time.sleep(1.5)
                
        if reply == "Unbroken" and default == True:
            print ("Closing Door")
            servo1.setDirection(0)
            GPIO.cleanup()
            servo1.setDirection(0)
            GPIO.cleanup()
            print ("Door Closed")
            
            #Restarting the Program
            return True
            
        
