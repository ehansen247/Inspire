angular
    .module("quote")
    .component("quote", {
        // Note: The URL is relative to our `index.html` file
        templateUrl: "quote/quote.html",
        controller: function getQuote() {
            const db = "d5q93bglraeukc";
            const user = "apfwknldnvcnwb";
            const host = "ec2-107-20-185-16.compute-1.amazonaws.com";
            const password = "21c5e15664d7689b039bc1c59f84f7dd3944a2073625f511ee972e789206806e";
            connString="host=" + host + " dbname=" + db + 
                       " user=" + user + " password=" + password;
            
            const { Client } = require('pg');
            const client = new Client({
                user: user,
                host: host,
                database: db,
                password: password,
              });

            client.connect();

            client.query("SELECT quote_text, author FROM quotes WHERE id = 14", (err, res) => {
                console.log(err, res)
                client.end()
              });
        }
    });