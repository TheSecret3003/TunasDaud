import psycopg2

def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(user="pzssbtkzpmnvub",
                              password="a772ca28135d8bfac88c7acd3b7d45f57f7a1d3b7498e5ddd66f4f5d4cc998dc",
                              host="ec2-54-91-178-234.compute-1.amazonaws.com",
                              port="5432",
                              database="d9h0giveuhud7e")
		
        # create a cursor
        cur = conn.cursor()
        
	# execute a statement
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')

        # display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)
       
	# close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)