<?php
$id = $_GET['id'];
// Connect to database
$connect = mysqli_connect('host', 'username', 'password', 'database');
$query = mysqli_query($connect,"select * from videos where id = '$id'");
$videodata = mysqli_fetch_array($query);
$exist = mysqli_num_rows($query);
if($exist === 0) {
?>
<script>
setTimeout(function() {
  notExist();
}, 3000);
</script>
<?php
}
// example variables
$videoTitle = $videodata['title'];
$videoURL = $videodata['url'];
$videoID = $videodata['id'];
$videoThumb = $videodata['thumbnail'];
$pubID = $videodata['authorid'];
