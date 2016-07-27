<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

mysql_connect('mysql13.000webhost.com', 'a9390651_admin', 'Firefly$01');
mysql_select_db('a9390651_data');

$title = $_POST['title'];

//$id = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7)), 0, 7);

$id = $_POST['id'];

$uploaddir = 'videos';

//Loop through each file
for($i=0; $i<count($_FILES['upload']['name']); $i++) {
  //Get the temp file path
  $tmpFilePath = $_FILES['upload']['tmp_name'][$i];

  //Make sure we have a filepath
  if ($tmpFilePath != ""){
    //Setup our new file path
    $newFilePath = $uploaddir . "/" . $_FILES['upload']['name'][$i];

    //Upload the file into the temp dir
    if(move_uploaded_file($tmpFilePath, $newFilePath)) {
    if(mysql_query("insert into videos (title,id,url) VALUES ('$title','$id','$newFilePath')")) {
    echo "Hallelujah";
    }
    else {
    echo "well...that wasn't right.";
    }
    }
  }
}

?>