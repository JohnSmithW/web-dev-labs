<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-with');


$email = $_POST["email"];
$name = $_POST["name"];
$occupancy = $_POST["occupancy"];



$errors = new \stdClass;
$errors->email = null;
$errors->name = null;
$errors->occupancy = null;

$file = 'users.json';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors->email = true;
}

$data = ['id' => $request_id];

$user = ['email' => $email, 'name' => $name, 'occupancy' => $occupancy];


file_put_contents(
  $file,
  json_encode($user)
);




echo json_encode($user);
