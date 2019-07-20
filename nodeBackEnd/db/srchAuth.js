import pgp from 'pg-promise';
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

export default srchAuth;
