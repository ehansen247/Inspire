const { Pool, Client } = require('pg');
const connectionString = process.env.INSPIRE_DB_CONNECTION_STRING;

// Search Query for a quote, author, or username
const query = (text, type, callback) => {
  const client = new Client({
    connectionString: connectionString,
    ssl: true
  });
  client.connect();

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
    values = ["% " + text.toLowerCase() + "%", "%" + text.charAt(0).toUpperCase() + text.slice(1) + "%"];
  }
  else { // (type == "Random") id between 12 and 4108
    query = "SELECT quote_text, author FROM quotes WHERE id = $1";
    values = [parseInt(text)];
  }

  client.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
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
    callback(null, results);
  });
};

const checkUserPassword = (username, password, callback) => {
  const client = new Client({
    connectionString: connectionString,
    ssl: true,
  });

  client.connect();
  client.query("SELECT password FROM userquotes WHERE username=$1", [username], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    }
    if (result.rowCount == 0) {
      callback(null, "New User");
    }
    else if (result.rows[0].password == password) {
      callback(null, "Authentication Valid");
    }
    else {
      callback(null, "Authentication Invalid");
    }
    client.end();
  });
};

// No callback because data
const submitUserQuote = (text, username, password, callback) => {
  const client = new Client({
    connectionString: connectionString,
    ssl: true,
  });
  client.connect();
  client.query("INSERT INTO userquotes (quote_text, username, password) VALUES ($1, $2, $3)", [text, username, password], (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null);
    }
    callback(null, result);
    client.end();
  });
};

const pool = new Pool({
  connectionString: connectionString,
  ssl: true,
})

const getTest = (request, response) => {
  pool.query('SELECT * FROM quotes WHERE id = 1', [], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send("Successful");
  })
}

module.exports = {
  query,
  checkUserPassword,
  submitUserQuote,
  getTest,
}

