<?php
require("db.php");
?>
<script type="text/javascript" src="https://code.jquery.com/jquery-latest.js"></script>
<link rel="stylesheet" href="css/typicons.min.css">
<link rel="stylesheet" href="css/style.css">

<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-59564a3ffd613bd0"></script>

<div id="sharemodal">
<div id="cont">
<div class="addthis_inline_share_toolbox_r7fv" data-title="<?php echo $videoTitle; ?>" data-url="<?php echo $videoURL; ?>" data-description="Watch video on website" data-media="<?php echo $videoThumb; ?>"></div>
<div id="closebutton" onclick="shareClose();">CLOSE</div>
</div>
</div>

<div id="refresh" style="display: none;" onclick="refresh();"><span class="typcn typcn-refresh"></span></div>
<div id="error" style="display: none;"><span style="font-weight: bold;font-size: 25px;">That video doesn't exist.</span><br/>Sorry about that.</div>
<div id="bigplay" onclick="hidePlay();"><span class="typcn typcn-media-play"></span></div>
<div id="maincont">
<?php
if($_GET['info'] !== "0") {
?>
<div class="vinfo" id="info">
<div>&nbsp;</div>
<!--You can add several buttons-->
<div id="infobtn"><a href="javascript:;" onclick="share();">Share</a></div>
</div>
<?php
}
?>
<input type="hidden" id="vid" value="<?php echo $videoID; ?>"/>
<div class="load small" id="load"></div>

<div class="vcontainer">
<video src="<?php echo $videoURL; ?>" poster="<?php echo $videoThumb; ?>" id="video" type="video/mp4"></video>
</div>

<div id="controls">
<table><tr>
<td style="width: 50px;">
<button type="button" id="playpause"><span class="typcn typcn-media-play"></span></button>
</td>
<td class="time" id="current">0:00</td>
<td style="vertical-align: middle;width: 900px;">
<div class="wrap"><input type="range" id="seekbar" value="0"></div>
</td>
<td class="time" id="duration">0:00</td>
<td style="width: 30px;">
<button type="button" id="mute" tooltip="Mute"><span class="typcn typcn-volume-up"></span></button>
</td>
<td style="vertical-align: middle;width: 250px;">
<div class="wrap"><input type="range" id="volumebar" min="0" max="1" step="0.1" value="0"></div>
</td>
<td style="width: 50px;">
<button type="button" id="fullscreen" tooltip="Go Fullscreen"><span class="typcn typcn-arrow-maximise"></span></button>
</td>
</tr></table>
</div>
<script type="text/javascript" src="/video-player/player.js"></script>
<?php
if($_GET['autoplay'] === "1") {
?>
<script>
$(document).ready(function() {
  hidePlay();
  document.getElementById("bigplay").style.visibility = 'hidden';
});
</script>
<?php
}
