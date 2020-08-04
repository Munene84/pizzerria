<?php
include 'db_connection.php';
$conn = OpenCon();
echo "Connected Successfully";
CloseCon($conn);


$size = $_POST['size'];
$crust = $_POST['crust'];
$toppings = $_POST['toppings'];
$noOfPizzas = $_POST['noOfPizzas'];
$delivery= $_POST['delivery'];
$location= $_POST['location'];
if (!empty($size) || !empty($crust) || !empty($toppings) || !empty($noOfPizzas) || !empty($delivery) || !empty($location)) {
}


?>