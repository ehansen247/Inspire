
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
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
      success: 'False',
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

// Checking if user/password combination is valid
app.post('/api/authenticate', (req, res, next) => {
  if(!req.body.username || !req.body.password) {
    return res.status(400).send({
      success: 'False',
      message: 'User and Password required'
    });
  }
  else
  {
    db.checkUserPassword(req.body.username, req.body.password, function(err, message) {
      if(err) {return next(err) };
      res.message = message;
      next();
    })
  }
});

// Authenticate
app.post('/api/authenticate', (req, res) => {
  return res.status(200).send({
    message: res.message,
    success: "True"
  });
});


// Handling submitted user quotes
app.post('/api/submitUserQuote', (req, res, next) => {
  if(!req.body.text || !req.body.username || !req.body.password) {
    return res.status(400).send({
      success: 'False',
      message: 'Text and User required'
    });
  }
  else
  {
    db.submitUserQuote(req.body.text, req.body.username, req.body.password, function(err, results) {
      if(err) {return next(err) };
      res.results = results;
      next();
    });
  }
});

app.post('/api/submitUserQuote', (req, res) => {
    return res.status(200).send({
      success: 'True',
      message: 'Upload of user quote to database pending'
    });
});

// Test
app.get('/api/test', db.getTest);

// API will listen on localhost: 8000
app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on port ${process.env.PORT || 8000}`)
});




