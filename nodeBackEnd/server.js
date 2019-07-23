import express from 'express';
import bodyParser from "body-parser";
const { Pool, Client } = require('pg');
import cors from "cors";
import { runInNewContext } from 'vm';

const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function query (text, type, callback) {
  const pool = new Pool({
    connectionString: "postgres://apfwknldnvcnwb:21c5e15664d7689b039bc1c59f84f7dd3944a2073625f511ee972e789206806e@ec2-107-20-185-16.compute-1.amazonaws.com:5432/d5q93bglraeukc"
    ,
    ssl: true,
  });

  var query = "";
  var values = [];

  if (type === "author") {
    console.log(text.charAt(0).toUpperCase() + text.slice(1));
    query = "SELECT quote_text, author FROM quotes WHERE author LIKE $1";
    values = ['%' + text.charAt(0).toUpperCase() + text.slice(1) + '%'];
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
        results.push({"quote": curRow.quote_text, "author": curRow.author});
      }
      console.log(results);
      pool.end();
      callback(null, results);
    });
  });
}

app.post("/api/search", (req, res, next) =>
{
  if(!req.body.text || !req.body.type) {
    return res.status(400).send({
      success: 'false',
      message: 'Text and Type required',
      test: "Really?",
      results: req.body.text + ", " + req.body.type
    });
  }
  else {
    query(req.body.text, req.body.type, function(err, results) {
      if(err) { return next(err) };
      res.results = results;
      next();
    })
  }
});

// After callback from the post request is called and handled in query function, 
// we can now return res.results!
app.post('/api/search', (req, res) => {
  return res.status(200).send({
    success: res.results,
    message: 'Successful'
  });
});
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});




