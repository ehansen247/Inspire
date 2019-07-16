
const express = require('express');
const app = express();
const port = 3000;

const database = "d5q93bglraeukc";
const user = "apfwknldnvcnwb";
const host = "ec2-107-20-185-16.compute-1.amazonaws.com";
const password = "21c5e15664d7689b039bc1c59f84f7dd3944a2073625f511ee972e789206806e";
const dbPort = "5432";

var pgp = require('pg-promise')();
const cn = {
    host: "ec2-107-20-185-16.compute-1.amazonaws.com",
    port: 5432,
    database: "d5q93bglraeukc",
    user: "apfwknldnvcnwb",
    password: "21c5e15664d7689b039bc1c59f84f7dd3944a2073625f511ee972e789206806e",
    ssl: true
};


// Usage: db.any('SELECT * FROM product WHERE price BETWEEN $1 AND $2', [1, 10])
var db = pgp(cn);

db.one("SELECT quote_text, author FROM quotes WHERE id = $1", 14)
    .then(function (data) {
    console.log('DATA:', data.quote_text);
  })
  .catch(function (error) {
    console.log('ERROR:', error);
  });

