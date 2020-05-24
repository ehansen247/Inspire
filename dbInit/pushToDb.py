# Connects to a PostgreSQL Database (built on Heroku, hosted on AWS)
# Pushes book information to database
# pylint: disable-all


import psycopg2
# Quotes indexed from 0 to 4194
from scrape import getAllQuotes, getQuotesRange, MAX_QUOTE
import sys

def main():

    # Parse Command Line Arguments
    num_args = len(sys.argv)
    start, end = None, None
    if num_args != 1 and num_args != 3:
        print("Enter a valid number of arguments")
        return -1

    if num_args == 3:
        start, end = int(sys.argv[1]), int(sys.argv[2])
        if start < 0 or end > MAX_QUOTE or start > end:
            print("Arguments do not fall in valid range")
            return -1



    conn = psycopg2.connect(user="erichansen",
                            dbname="inspire",
                            host="localhost")
    cur = conn.cursor()

    # # Uncomment any of the below options to create the tables or enter the user/author data
    # createUserQuotesTable(conn, cur)

    # createAuthorTable(conn, cur)

    # createQuoteTable(conn, cur)

    # # Fill Entire Table
    if num_args == 3:
        fillTableRange(conn, cur, start, end)
    else:
        fillTable(conn, cur)


    # Save Changes and Close communication with database
    conn.commit()
    cur.close()
    conn.close()

    return 0

# Fill Quote and Author Tables with Values
def fillTable(conn, cur):
    fillTableRange(conn, cur, 0, MAX_QUOTE)

def fillTableRange(conn, cur, start, end):
    for item in getQuotesRange(start, end):
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
