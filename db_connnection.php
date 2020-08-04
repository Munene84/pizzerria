<?php
function OpenCon()
 {
 $dbhost = "localhost";
 $dbuser = "edwin";
 $dbpass = "Ed0706364901";
 $db = "edwin";
 $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
 
 return $conn;
 }
 
function CloseCon($conn)
 {
 $conn -> close();
 }
   
?>