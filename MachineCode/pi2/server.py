import socket
import RPi.GPIO as GPIO
import time
import os
import sys, errno
import serverCheckout
# from signal import signal, SIGPIPE, SIG_DFL 
# signal(SIGPIPE, SIG_DFL)

def main():
    #Creating the connection
    HOST = '192.168.1.98'   #Server Name
    PORT = 2025             #Should be same as Server

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1200)
    print ("Tray Socket Created")
    try:
        s.bind((HOST, PORT))
    except socket.error:
        print ("Bind Failed")
        
    s.listen(1)
    print ("Socket awaiting messages")

    conn, addr = s.accept()

    sensor = 26
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(sensor, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    GPIO.input(sensor)

    while True:
        current = GPIO.input(sensor)
        if current == 1:
            #Beam Unbroken
            print(current)
            #conn.send(bytes("Unbroken", "utf-8"))
            try:
                conn.send(bytes("Unbroken", "utf-8"))
            except IOError as e:
                if e.errno == errno.EPIPE:
                    return True
            
        if current == 0:
            #Beam Broken
            print(current)
            #conn.send(bytes("Broken", "utf-8"))
            try:
                conn.send(bytes("Broken", "utf-8"))
            except IOError as e:
                if e.errno == errno.EPIPE:
                    return True
                
        time.sleep(.5)

    #conn.close() #closing connection
    
while True:
    run = main()
    GPIO.cleanup()
    if run == True:
        restart = serverCheckout.main()
        #os.execv(sys.executable, ['python'] + sys.argv)
    


