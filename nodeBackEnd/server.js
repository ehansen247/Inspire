import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
const db = require("./db.js");
const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Handling search queries
app.post("/api/search", (req, res, next) =>
{
  if(!req.body.text || !req.body.type) {
    return res.status(400).send({
      success: 'false',
      message: 'Text and Type required',
    });
  }
  else {
    db.query(req.body.text, req.body.type, function(err, results) {
      if(err) { return next(err) };
      res.results = results;
      next();
    })
  }
});

app.post('/api/search', (req, res) => {
  return res.status(200).send({
    success: res.results,
    message: 'Successful'
  });
});


// Handling submitted user quotes
app.post('/api/submitUserQuote', (req, res, next) => {
  console.log("reached2");
  if(!req.body.text || !req.body.user) {
    return res.status(400).send({
      success: 'false',
      message: 'Text and User required',
    });
  }
  else 
  {
    db.submitUserQuote(req.body.text, req.body.user, function(err, results) {
      if(err) {return next(err) };
      res.results = results;
      next();
    });
  }
});

app.post('/api/submitUserQuote', (req, res) => {
    console.log(res.results);
    return res.status(200).send({
      success: 'true',
      message: 'Upload of user quote to database pending'
    });
});

// API will listen on localhost: 8000
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});




