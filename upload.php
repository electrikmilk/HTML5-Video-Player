<script type="text/javascript" src="//code.jquery.com/jquery-latest.js"></script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,700,900);
html,
body {
	font-family: Roboto, sans-serif;
	-webkit-font-smoothing: antialiased;
	color: #333;
	font-size: 16px;
	line-height: 20px;
	background-color: #fff;
}

::selection {
	background: rgba(131, 174, 229, .5);
}

::-moz-selection {
	background: rgba(131, 174, 229, .5);
	/* Gecko Browsers */
}
input {
padding: 10px;
border: 1px solid #c7c7c7;
font-size: 16px;
outline: none;
width: 100%;
}
button {
background-color: #ccc;
color: #222;
padding: 10px;
border: none;
font-size: 16px;
}
/* Progress */

progress[value] {
    -webkit-appearance: none;
    appearance: none;
    width: 250px;
    height: 20px;
    padding-top: 6px;
}

progress[value]::-webkit-progress-bar {
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    height: 20px;
}

progress[value]::-webkit-progress-value {
    background-color: #4183D7;
    border-radius: 10px;
}

.progress-green[value]::-webkit-progress-value {
    background-color: #4CAF50;
}

.progress-red[value]::-webkit-progress-value {
    background-color: #ee6969ee6969
}

.skinny[value]::-webkit-progress-bar {
    height: 12px;
}

.skinny[value]::-webkit-progress-value {
    height: 10px;
}

.superskinny[value]::-webkit-progress-bar {
    border-radius: 0;
    height: 2px;
    border: none;
    border-top: 2px solid #c7c7c7;
    background: none;
}

.superskinny[value]::-webkit-progress-value {
    height: 2px;
    margin-top: -2px;
    border-radius: 0;
    border-right: 10px solid rgba(0, 0, 0, .3);
}
#progresstext {
padding: 5px;
}
</style>

<script>
function makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function uploadImage() {
  var file = document.getElementById('the_file').files[0];
  var file = document.getElementById('file_type').files[0];
  var fd = new FormData();
  var id = makeId();
  fd.append("upload", file);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'uploadvideo.php', true);
  document.getElementById("uploadprogress").style.display = '';
  document.getElementById("progresstext").style.display = 'inline-block';
  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      var percentComplete = (e.loaded / e.total) * 100;
      console.log(Math.round(percentComplete) + '%');
      document.getElementById("uploadprogress").value = Math.round(percentComplete);
      document.getElementById("progresstext").innerHTML = Math.round(percentComplete) + '%'
    }
  };
  xhr.onload = function() {
    if (this.status == 200) {
      document.getElementById("progresstext").style.color = "#7ac70c";
      $("#uploadprogress").addClass( "progress-green", 1000, "easeOut");
      setTimeout(function(){
      window.location = 'embed?id='+id;
      }, 2000);
    }
  };
  xhr.send(fd);
}
</script>

<label for="title">Video Title:</label><br/><input type="text" placeholder="Video Title" id="title"/>

<br/><br/>

<label for="the_file">Upload Video: </label><br/><input type="file" id="the_file" name="the_file" onchange="uploadImage();"/>

<div class="radio">
<label for="file-type">Type:</label>
<ul>
<li><input type="radio" class="input-radio" value="video" name="file_type" id="file_type" checked="checked" onclick="hideResizeOption();"> Video</li>
</ul>
</div>

<br/><br/>

<div id="progresstext" style="display: none;">0%</div><progress id="uploadprogress" class="skinny" style="display: none;" max="100"></progress>		