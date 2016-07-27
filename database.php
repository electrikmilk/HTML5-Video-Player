<?php

ini_set('upload_max_filesize', '2G');
ini_set('post_max_size', '2G');
ini_set('max_input_time', 9000);
ini_set('max_execution_time', 9000);

$id = $_GET['id'];

//We log in to the database
mysql_connect('mysql13.000webhost.com', 'a9390651_admin', 'Firefly$01');
mysql_select_db('a9390651_data');

$videodata = mysql_fetch_array(mysql_query("select * from videos where id = '$id'"));

$videoURL = $videodata['url'];

$title = $videodata['title'];

if (strlen($title) >= 20) {
$videoTitle = substr($title, 0, 20). "...";
}
else {
$videoTitle = $title;
}