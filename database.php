<?php

//Using PHP isn't required for this player to work, all this file is doing is showing how you could implement a database with video titles and file URL's.
//So then, all you'd have to do is supply it with an ID and it will get the title and file URL without you having to set it in the code.

$id = $_GET['id'];

//We log in to the database
mysql_connect('host', 'username', 'password');
mysql_select_db('database');

$videodata = mysql_fetch_array(mysql_query("select * from videos where id = '$id'"));

$videoURL = $videodata['url'];

$title = $videodata['title'];

if (strlen($title) >= 20) {
$videoTitle = substr($title, 0, 20). "...";
}
else {
$videoTitle = $title;
}
