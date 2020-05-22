const { Pool, Client } = require('pg');
const connectionString = "postgres://mnxisfxgcnhmcy:8749b087f19f6dc40db8dcc75a345c93f658ba08bb6be3f26f16a332c2b1c4d7@ec2-174-129-43-40.compute-1.amazonaws.com:5432/dvvd6q46r3vbr";


// exports.query = (text, type, callback) => {
//   console.log("reached");
//   const client = new Client({
//     user: 'mnxisfxgcnhmcy',
//     host: 'ec2-174-129-43-40.compute-1.amazonaws.com',
//     database: 'dvvd6q46r3vbr',
//     password: '8749b087f19f6dc40db8dcc75a345c93f658ba08bb6be3f26f16a332c2b1c4d7',
//     port: 5432,
//   });
//   client.connect();
//   console.log("reached2");
//   client.query('SELECT NOW()', (err, res) => {
//     console.log("reached4");
//     console.log(err, res);
//     client.end();
//     callback(null, res.rows);
//   });

  // var query = "";
  // var values = [];

  // if (type === "author") {
  //   query = "SELECT quote_text, author FROM quotes WHERE author LIKE $1";
  //   values = ['%' + text.charAt(0).toUpperCase() + text.slice(1) + '%'];
  // }
  // else if (type === "username") {
  //     query = "SELECT quote_text, username FROM userquotes WHERE username = $1";
  //     values = [text];
  // }
  // else if (type === "quote") {
  //   query = "SELECT quote_text, author FROM quotes WHERE quote_text LIKE $1 OR quote_text LIKE $2";
  //   values = ["% " + text.toLowerCase() + "%", "%" + text.charAt(0).toUpperCase() + text.slice(1) + "%"];
  // }
  // else { // (type == "Random") id between 12 and 4108
  //   query = "SELECT quote_text, author FROM quotes WHERE id = $1";
  //   values = [parseInt(text)];
  // }

  // console.log("reached2");
  // pool.query(query, values, (err, result) => {
  //   console.log("reached3");
  //   if (err) {
  //     console.log("reached4");
  //     callback(err, null);
  //     return;
  //   }
  //   var results = [];
  //   for (var i = 0; i < result.rowCount; i++) {
  //     var curRow = result.rows[i]
  //     var author = "";
  //     if (curRow.author) {
  //       author = curRow.author
  //     }
  //     else {
  //       author = curRow.username
  //     }
  //     results.push({"quote": curRow.quote_text, "author": author});
  //   }
  //   callback(null, results);
  // });
// };

// exports.checkUserPassword = (username, password, callback) => {
//   const pool = new Pool({
//     connectionString: connectionString,
//     ssl: true,
//   });

//   pool.connect((err, client, release) => {
//     if (err) {
//       console.error('Error acquiring client', err.stack);
//     }
//     console.log(username);
//     client.query("SELECT password FROM userquotes WHERE username=$1", [username], (err, result) => {
//       release();
//       if (err) {
//         console.log(err);
//         console.log("reached");
//         callback(err, null);
//       }
//       if (result.rowCount == 0) {
//         callback(null, "New User");
//       }
//       else if (result.rows[0].password == password) {
//         console.log("reached1");
//         callback(null, "Authentication Valid");
//       }
//       else {
//         console.log("reached2");
//         callback(null, "Authentication Invalid");
//       }
//       pool.end();
//     });
//   });
// };

// // No callback because data
// exports.submitUserQuote = (text, username, password, callback) => {
//     const pool = new Pool({
//         connectionString: connectionString,
//         ssl: true,
//       });
//     pool.connect((err, client, release) => {
//         if (err) {
//             console.error('Error acquiring client', err.stack);
//         }
//         client.query("INSERT INTO userquotes (quote_text, username, password) VALUES ($1, $2, $3)", [text, username, password], (err, result) => {
//             release();
//             if (err) {
//               callback(err, null);
//             }
//             callback(null, result);
//             pool.end();
//         });
//     });
// };

const pool = new Pool({
  user: 'erichansen',
  host: 'localhost',
  database: 'inspire',
  port: 5432,
  ssl: false,
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
  getTest,
}

