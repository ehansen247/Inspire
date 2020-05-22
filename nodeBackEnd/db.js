const { Pool, Client } = require('pg');
const connectionString = "postgres://rozyrvexkkzyeg:de9dd1d923c06a0770f5354776b76d80549497bb22586d30279aa2b5729153b5@ec2-35-169-254-43.compute-1.amazonaws.com:5432/deumhl8fpku64s";

const query = (text, type, callback) => {
  console.log("reached");
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

  console.log("reached2");
  client.query(query, values, (err, result) => {
    console.log("reached3");
    if (err) {
      console.log("reached4");
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
  console.log(username);
  client.query("SELECT password FROM userquotes WHERE username=$1", [username], (err, result) => {
    if (err) {
      console.log(err);
      console.log("reached");
      callback(err, null);
    }
    if (result.rowCount == 0) {
      callback(null, "New User");
    }
    else if (result.rows[0].password == password) {
      console.log("reached1");
      callback(null, "Authentication Valid");
    }
    else {
      console.log("reached2");
      callback(null, "Authentication Invalid");
    }
    pool.end();
  });
};

// No callback because data
const submitUserQuote = (text, username, password, callback) => {
  const client = new Client({
    connectionString: connectionString,
    ssl: true,
  });
  client.query("INSERT INTO userquotes (quote_text, username, password) VALUES ($1, $2, $3)", [text, username, password], (err, result) => {
    if (err) {
      callback(err, null);
    }
    callback(null, result);
    pool.end();
  });
};

const pool = new Pool({
  connectionString: connectionString,
  ssl: true,
})

const getTest = (request, response) => {
  console.log("reached1");
  pool.query('SELECT * FROM quotes WHERE id = 1', [], (error, results) => {
    console.log("reached2");
    if (error) {
      throw error
    }
    console.log(results);
    response.status(200).send("Successful");
  })
}

module.exports = {
  query,
  checkUserPassword,
  submitUserQuote,
  getTest,
}

