# Connects to a PostgreSQL Database (built on Heroku, hosted on AWS)
# Pushes book information to database
# pylint: disable-all


import psycopg2
from scrape import getAllQuotes

def main():

    conn = psycopg2.connect(user="erichansen",
                            dbname="inspire",
                            host="localhost")
    cur = conn.cursor()

    # Uncomment any of the below options to create the tables or enter the user/author data
    # As of 07/27/19, all necessary data has been created in the above database.

    # createUserQuotesTable(conn, cur)

    # createAuthorTable(conn, cur)

    # createQuoteTable(conn, cur)

    fillTables(conn, cur)

    # Save Changes and Close communication with database
    conn.commit()
    cur.close()
    conn.close()

# Fill Quote and Author Tables with Values
def fillTables(conn, cur):
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

def createQuoteTable(conn, cur):
    cur.execute("CREATE TABLE quotes (id serial PRIMARY KEY, quote_text text, author varchar(255), length integer);")

def createAuthorTable(conn, cur):
    cur.execute("CREATE TABLE authors (id serial PRIMARY KEY, name varchar(255), num_quotes integer);")

def createUserQuotesTable(conn, cur):
    cur.execute("CREATE TABLE userquotes (id serial PRIMARY KEY, quote_text TEXT, username varchar(255), password varchar(255));")

if __name__ == "__main__":
    main()
