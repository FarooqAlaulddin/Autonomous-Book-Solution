#***Install these***
#sudo apt install fswebcam
#sudo apt-get update
#sudo apt-get install python3-opencv
#sudo apt-get install libqt4-test python3-sip python3-pyqt5 libqtgui4 libjasper-dev libatlas-base-dev -y
#pip3 install opencv-contrib-python==4.1.0.25
#sudo modprobe bcm2835-v412
#pip3 install pyzbar


import RPi.GPIO as GPIO
import time
import cv2
import pyzbar.pyzbar as zbar
import servo1
import client
import clientCheckout
import os
import sys
from DBValidation import resv_val

global temp
temp = False


#ser = serial.Serial('/dev/ttyACM0',9600)        
#-----------------------------------------------------------------------------------------------------------------#

#QR code scanning: returns book name
#sajan's code
#Khalid: I added the bookName variable, needs to double check it's grabbing the correct data
def scanQRCode():
    #For saving the book name and returning it to the
    print("This is QR Method")
    bookName = ""

    cap = cv2.VideoCapture(0)
    font = cv2.FONT_HERSHEY_SIMPLEX 

    DELAY = 1
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 3)

    scanning = True

    while(scanning):
        ret = cv2.waitKey(DELAY) & 0xFF

        # Capture frame-by-frame
        ret, frame = cap.read(3)

        decodedObjects = zbar.decode(frame)
        if len(decodedObjects) > 0:
            stopped = True
            y = 50
            for obj in decodedObjects:
                #print("Data", obj.data)
                #print(obj.data.decode("utf-8"))
                bookName = obj.data.decode("utf-8")
                print(bookName)
                scanning = False
            
                #Below frame can be deleted, we dont need it in real running program**
                cv2.putText(frame, obj.data.decode("utf-8"), (50, y), font, 2, (255, 0, 0), 3)
                y += 50

        # Display the resulting frame
        cv2.imshow('frame',frame)

    # When everything done, release the capture
    cap.release()
    cv2.destroyAllWindows()
    return bookName
     
#-----------------------------------------------------------------------------------------------------------------#

#Book name to cell number: Takes book name, Returns cell number
def getCellNum(bookName):
    print("This is CellNum Method")
    cellNum = 1
    if bookName == "Introduction to Algorithms, Third Edition":
        cellNum = 1
    elif bookName == "Contemporary Abstract Algebra":
        cellNum = 2
    elif bookName == "Programming JavaScript Applications":
        cellNum = 3
    elif bookName == "Speaking JavaScript":
        cellNum = 4
    elif bookName == "Learning JavaScript Design Patterns":
        cellNum = 5
    elif bookName == "Eloquent JavaScript, Second Edition":
        cellNum = 6
    print(cellNum)
    return cellNum

#-----------------------------------------------------------------------------------------------------------------#
#Main Module 
def main():
    #QR code scanning: returns book name
    orderID = scanQRCode()
    print("OrderID: " + orderID)
    #We should put qr code confirmation here.
    bookName = resv_val(orderID)
    print("Book Name: ", bookName)
    if bookName == '':
        print("Restarting")
        return
    else:
        
        #Book name to cell number: Takes book name, Returns cell number
        cellNum = getCellNum(bookName)
        #Arduino: Returns checkout window & tray alignment confirmation
    #     if cellNum == 0:
    #         print("Incorrect QR Code: CellNum not found.")
    #         return #if doesn't work try "continue"
    #    else:
        confirm = servo1.activateSliders(0, cellNum)
        if cellNum == 3 or cellNum == 4:
            time.sleep(4)
        trayDone = client.main(cellNum)
        print(trayDone)
        time.sleep(2)
        clientCheckout.main()
    
    
#while True:
print ("===========================================================================================")
print ("=                                   START PROGRAM                                         =")
print ("===========================================================================================")
main()
os.execv(sys.executable, ['python3'] + sys.argv)
        
