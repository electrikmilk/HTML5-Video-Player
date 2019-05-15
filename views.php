<?php
$videoID = $_POST['id'];
// Count a view
$connection3 = mysqli_connect('host', 'username', 'password', 'database');
$metadata = mysqli_fetch_array(mysqli_query($connection3,"select * from videos where id = '$videoID' limit 1"));
$currentviews = $metadata['views'];
$currentviews++;
$query = mysqli_query($connection3,"update videos set views = '$currentviews' where id = '$videoID'");
