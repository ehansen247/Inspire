## Introduction
Search a database of over 4,000 quotes, check out our daily quotes, or write and save your own quote in our database.
Developed with Angular front end, Node.js/Express on the server-side, and a PostgreSQL database hosted by Heroku.  

### Getting Started
1. Clone the repository
2. Startup the Express Server on your localhost
3. Startup the Web Application on your localhost (port 4200).
4. Navigate to localhost:4200 or 127.0.0.1:4200 to see the app.

```
git clone https://github.com/ehansen247/Inspire.git  
cd Inspire  
cd nodeBackend
npm run start
***In separate CLI window***
cd Inspire
cd angularFrontEnd
npm start
```
Then check out localhost:4200 to see the website!


TODO:
* Categorizing quotes by theme.
* Encrypt Passwords.
* Load DailyQuote upon initial access. 
* Expanding the database of quotes.
* Set DailyQuote for local time zone, not UTC.
