## Introduction

Access Online: https://inspire-webview.herokuapp.com/. Deployed with Heroku & Docker.

Search a database of over 4,000 quotes, check out our daily quotes, or write and save your own quote in our database.
Developed with Angular front end, Node.js/Express on the server-side, and a PostgreSQL database hosted by Heroku.


### Deploying Locally
1. Clone the repository
2. Create a database and set an environment variable INSPIRE_DB_CONNECTION_STRING to the connection string.
3. Startup the Express Server on your localhost
4. Startup the Web Application on your localhost (port 4200).
5. Navigate to localhost:4200 or 127.0.0.1:4200 to see the app.

```
git clone https://github.com/ehansen247/Inspire.git
cd Inspire
cd nodeBackend
npm install
npm run start
***In separate shell***
cd Inspire
cd angularFrontEnd
npm install
npm start
```
Then check out localhost:4200 to see the website! Note that the core features will be non-functional locally unless you create & fill your own database and configure the connection string as an environment variable.

### Deploying with Docker locally

```
git clone https://github.com/ehansen247/Inspire.git
cd Inspire
cd nodeBackend
docker build .
docker run -p 8000:8000 [image id]
***In separate shell***
cd Inspire
cd angularFrontEnd
docker build .
docker run -p 4200:4200 [image id]
```
Then check out localhost:4200 to see the website!

### DbInit
These are the scripts used to scrape the ~4000 quotes from online (https://quotedb.com/) and push them to the database using BeautifulSoup and psycopg2.

TODO:
* Categorizing quotes by theme.
* Load DailyQuote upon initial access.
* Expanding the database of quotes.
* Set DailyQuote for local time zone, not UTC.
