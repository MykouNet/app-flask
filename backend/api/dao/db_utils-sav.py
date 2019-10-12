
#https://www.w3schools.com/python/python_mysql_getstarted.asp
#pip3 install mysql-connector

import mysql.connector

mydb = mysql.connector.connect(
  host="db5000192120.hosting-data.io",
  user="dbu105610",
  passwd="Fabio10$001",
  database="dbs186943",
  port=3306
)

def getDB():
    return mydb

#print(mydb)