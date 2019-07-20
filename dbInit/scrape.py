# https://www.quotedb.com/authors/b

# 1) quoteddb.com/quotes/1->4194

from bs4 import BeautifulSoup
import requests


# Returns a single quote, author object from quotedb.com
def getQuoteInfo(num):
    # Fetch the html file
    url = 'https://www.quotedb.com/quotes/' + str(num)
    data = requests.get(url)
    soup = BeautifulSoup(data.text, 'html.parser')

    # Extracting full quote including quote and author name
    full_quote = soup.title.string

    # Extracting Author Name
    author = soup.select_one("a[href*='/authors/']").string

    quote_text = full_quote[0: full_quote.index(author) - 4].strip('\"')
    print(quote_text)
    print(num)

    return ({
        "author": author,
        "quote": quote_text
    })


# Builds and returns a list of quotes from quotedb.com
def getAllQuotes():
    quotes = []

    for i in range(4170, 4194):
        try:
            quotes.append(getQuoteInfo(i))
        except: 
            continue
    
    return quotes