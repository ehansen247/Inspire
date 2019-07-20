<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$results = [];
$sql = "SELECT quote_text FROM quotes";

if($result = pg_query_params($con, $sql, []))
{
  $i = 0;
  while($row = pg_fetch_assoc($result) && $i < 10)
  {
    $results[$i]['text']     = $row['quote_text'];
    $i++;
  }

  echo json_encode($results);
}
else
{
  http_response_code(404);
}