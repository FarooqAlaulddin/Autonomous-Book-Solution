import socket
import time
import RPi.GPIO as GPIO

def main():
    HOST = '192.168.1.98' #Server IP Adderss
    PORT = 2025 #Should be same as Server Port

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST, PORT))

    Dropped = False
    Pickedup = False

    while True:
        
        data = s.recv(1024)
        reply = data.decode("utf-8")
        print (reply)
        
        if reply == "Broken":
            Dropped = True
        
        if Dropped == True:
            if reply == "Unbroken":
                Pickedup = True
            
        if Dropped == True and Pickedup == True:
            #Restarting the Program
            print ("Restarting")
            return True
            
        

