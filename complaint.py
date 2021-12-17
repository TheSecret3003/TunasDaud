from database import connect

def index():
    

cursor = connection.cursor()
cursor.execute("SELECT * FROM customers")
result = cursor.fetchall()
