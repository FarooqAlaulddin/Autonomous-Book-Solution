import mysql.connector
from mysql.connector import Error
from datetime import datetime
from datetime import date
from absemail import sendmail

def resv_val(orderId):
    connection=None
    bookName=''
    try:
        connection = mysql.connector.connect(host='192.168.1.74',
                                             database='abs',
                                             user='pi',
                                             password='yes'
                                             )
        print("After connection ")
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            print("You're connected to database: ", record)
            
            orders = connection.cursor()
            query="""SELECT * FROM orders WHERE id=%s"""
            tuple1=(orderId,)
            orders.execute(query,tuple1)
            
            for row in orders:
                pickupStatus=row[5]
                
                if pickupStatus == 1:
                    userID=row[10]
                    userEmail = connection.cursor()
                    query="""SELECT email FROM daouser WHERE id=%s"""
                    tuple1=(userID,)
                    userEmail.execute(query,tuple1)
                    
                    for row in userEmail:
                        print(row[0])
                        email=row[0]
                    #send an email saying its picked up
                    print("Pickedup")
                    sendmail(email, "ABS: Invalid QR Code", "Dear user,\nThe book has been picked up already.")
                    bookName=''
                else:
                    bookName = row[1]
                    
                    pickupDate=row[7]
                    
                    startTime=str(row[8])
                    
                    endTime=str(row[9])
                
                    userID=row[10]
                            
                    userEmail = connection.cursor()
                    query="""SELECT email FROM daouser WHERE id=%s"""
                    tuple1=(userID,)
                    userEmail.execute(query,tuple1)
                    
                    for row in userEmail:
                        print(row[0])
                        email=row[0]
                
                    now = datetime.now()
                    current_time = now.strftime("%H:%M:%S")
                    today = date.today()
                    
                    if pickupDate < today:
                        comeBack = ("Dear user, \nPlease come back at ", pickupDate)
                        sendmail(email, "ABS: Reservation Date", comeBack)
                        bookName=''
                        
                    elif pickupDate > today:
                        tooLate = "Dear user, \nYour Reservation was on ", pickupDate
                        sendmail(email, "ABS: Reservation expired!", tooLate)
                        bookName=''

                    elif current_time < startTime:
                        incorrectSlot = "Dear user, \nPlease come between " + startTime + " and "+ endTime
                        sendmail(email, "ABS: Incorrect Time Slot", incorrectSlot)
                        bookName=''

                    elif current_time > endTime:
                        expired = "Reservation expired! Your Reservation ended at ", endTime
                        sendmail(email, "ABS: Reservation expired!", expired)
                        bookName=''
                    
                    else:
                        query="""UPDATE orders SET is_pickedup=1 WHERE id = %s"""
                        tuple1=(orderId,)
                        orders.execute(query,tuple1)
                        resvDone = "Dear user, \n You have received your order. Please return in 14 days."
                        sendmail(email, "ABS: Reservation Completed!", resvDone)

            
            connection.commit()

    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection is not None and connection.is_connected():
            connection.close()
            print("MySQL connection is closed")
            return bookName
