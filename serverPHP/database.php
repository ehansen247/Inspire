<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

define('DB_HOST', 'ec2-107-20-185-16.compute-1.amazonaws.com');
define('DB_USER', 'apfwknldnvcnwb');
define('DB_PASS', '21c5e15664d7689b039bc1c59f84f7dd3944a2073625f511ee972e789206806e');
define('DB_NAME', 'd5q93bglraeukc');

function connect()
{
  $connect = pg_connect("host=" . DB_HOST . " user=" . DB_USER  . " password=" . DB_PASS . " dbname=" . DB_NAME)
             or die("Could not connect");

  return $connect;

}

$con = connect();