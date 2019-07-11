# Connects to a PostgreSQL Database (built on Heroku, hosted on AWS)
# Pushes book information to database
# pylint: disable-all


import psycopg2
from scrape import getAllQuotes

def main():

    conn = psycopg2.connect(dbname="d5q93bglraeukc",
                            user="apfwknldnvcnwb", 
                            password="21c5e15664d7689b039bc1c59f84f7dd3944a2073625f511ee972e789206806e",
                            host="ec2-107-20-185-16.compute-1.amazonaws.com")
    cur = conn.cursor()

    # Only want to create and build quotes and authors tables once!
    for item in getAllQuotes():
        q = item["quote"]
        a = item["author"]
        cur.execute("INSERT INTO quotes (quote_text, author, length) VALUES (%s, %s, %s)", (q, a, len(q)))

        cur.execute("SELECT * from authors WHERE name=%s", (a,))
        if cur.rowcount == 0:
            cur.execute("INSERT INTO authors (name, num_quotes) VALUES (%s, %s)", (a, 1))
        else:
            num_quotes = cur.fetchone()[2]
            cur.execute("UPDATE authors SET num_quotes=%s WHERE name=%s", (num_quotes + 1, a))

    # Save Changes and Close communication with database
    conn.commit()
    cur.close()
    conn.close()

def createQuoteTable(conn, cur):
    cur.execute("CREATE TABLE quotes (id serial PRIMARY KEY, quote_text text, author varchar(255), length integer);")
    
    for item in getAllQuotes():
        q = item["quote"]
        a = item["author"]
        cur.execute("INSERT INTO quotes (%s, %s, %s)", (q, a, len(q)))

        

def createAuthorTable(conn, cur):
    cur.execute("CREATE TABLE authors (id serial PRIMARY KEY, name varchar(255), num_quotes integer);")
    
    for item in getAllQuotes():
        a = item["author"]
        cur.execute("SELECT * from authors WHERE name=%s", (a,))
        if cur.rowCount == 0:
            cur.execute("INSERT INTO authors (%s, %s)", (a, 1))
        else:
            num_quotes = cur.fetchOne()[2]
            cur.execute("UPDATE authors SET num_quotes=%s WHERE name=%s", (num_quotes + 1, a))


if __name__ == "__main__":
    main()