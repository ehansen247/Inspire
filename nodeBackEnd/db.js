const { Pool, Client } = require('pg');

export function query (text, type, callback) {
    const pool = new Pool({
      connectionString: "postgres://apfwknldnvcnwb:21c5e15664d7689b039bc1c59f84f7dd3944a2073625f511ee972e789206806e@ec2-107-20-185-16.compute-1.amazonaws.com:5432/d5q93bglraeukc"
      ,
      ssl: true,
    });
  
    var query = "";
    var values = [];
  
    if (type === "author") {
      query = "SELECT quote_text, author FROM quotes WHERE author LIKE $1";
      values = ['%' + text.charAt(0).toUpperCase() + text.slice(1) + '%'];
    }
    else if (type === "username") {
        query = "SELECT quote_text, username FROM userquotes WHERE username = $1";
        values = [text];
    }
    else if (type === "quote") {
      query = "SELECT quote_text, author FROM quotes WHERE quote_text LIKE $1 OR quote_text LIKE $2";
      values = ["% " + text + "%", "%" + text.charAt(0).toUpperCase() + text.slice(1) + "%"];
    }
    else { // (type == "Random") id between 12 and 4108
      const rand = Math.round(Math.random() * 4096) + 12
      query = "SELECT quote_text, author FROM quotes WHERE id = $1";
      values = [rand];
    }
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query(query, values, (err, result) => {
        release();
        if (err) {
          callback (err, null);
        }
        var results = [];
        for (var i = 0; i < result.rowCount; i++) {
          var curRow = result.rows[i]
          var author = "";
          if (curRow.author) {
            author = curRow.author
          }
          else {
            author = curRow.username
          }
          results.push({"quote": curRow.quote_text, "author": author});
        }
        console.log(results);
        pool.end();
        callback(null, results);
      });
    });
}

// No callback because data
export function submitUserQuote(text, user, callback) {
    console.log("reached");
    const pool = new Pool({
        connectionString: "postgres://apfwknldnvcnwb:21c5e15664d7689b039bc1c59f84f7dd3944a2073625f511ee972e789206806e@ec2-107-20-185-16.compute-1.amazonaws.com:5432/d5q93bglraeukc"
        ,
        ssl: true,
      });
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error acquiring client', err.stack);
        }
        client.query("INSERT INTO userquotes (quote_text, username) VALUES ($1, $2)", [text, user], (err, result) => {
            release();
            if (err) {
              callback(err, null);
            }
            callback(null, result);
            pool.end();
        });
    });
}

