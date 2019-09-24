
#https://www.w3schools.com/python/python_mysql_getstarted.asp
#pip3 install mysql-connector

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="root",
  database="databaseprojet",
  port=3306
)

def getDB():
    return mydb

#print(mydb)