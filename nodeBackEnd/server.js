import express from 'express';
import bodyParser from "body-parser";
const { Client } = require('pg');
import cors from "cors";

const app = express();

app.use(cors);

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function query (type, text) {
  const client = new Client({
    connectionString: "postgres://apfwknldnvcnwb:21c5e15664d7689b039bc1c59f84f7dd3944a2073625f511ee972e789206806e@ec2-107-20-185-16.compute-1.amazonaws.com:5432/d5q93bglraeukc"
    ,
    ssl: true,
  });

  client.connect();
  var query = "";
  var values = [];

  if (type == "Author") {
    query = "SELECT quote_text, author FROM quotes WHERE author = $1";
    values = [text];
  }
  else if (type == "Quote") {
    query = "SELECT quote_text, author FROM quotes WHERE quote_text LIKE $1";
    values = ["%" + text + "%"];
  }
  else { // (type == "Random") id between 12 and 4108
    const rand = Math.round(Math.random() * 4096) + 12
    query = "SELECT quote_text, author FROM quotes WHERE id = $1";
    values = [rand];
  }
  client.query(query, values, (err, res) => {
    if (err) throw err;
    client.end();
    return res.rows;
  });
}
// Set up an API endpoint
app.post('/api/search', (req, res) => {
  console.log("received");
  if(!req.body.text || !req.body.type) {
    return res.status(400).send({
      success: 'false',
      message: 'Text and Type required',
      params: req.body.text + ", " + req.body.type
    });
  }
  else {
    var rows = query(req.body.type, req.body.text);
    return res.status(200).send({
      success: 'true',
      message: 'Search Query',
      results: rows
    });
  }
});

app.get('/api/get/', (req, res) => {
  console.log("received");
  res.status(200).send({
    success: 'true',
    message: 'Get Test',
  })
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});




