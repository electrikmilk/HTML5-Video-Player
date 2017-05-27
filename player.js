// Video
var video = document.getElementById("video");

// Buttons
var playpauseButton = document.getElementById("playpause");
var muteButton = document.getElementById("mute");
var fullScreenButton = document.getElementById("fullscreen");

// Sliders
var seekBar = document.getElementById("seekbar");
var volumeBar = document.getElementById("volumebar");

//Misc
var controls = document.getElementById("controls");
var info = document.getElementById("info");
var bigplay = document.getElementById("bigplay");
var error = document.getElementById("error");
var load = document.getElementById("load");
var refresh = document.getElementById("refresh");

$(document).ready(function() {
	// Init
	$("#sharemodal").hide();
	$("#load").hide();
	controls.style.display = 'none';
	bigplay.style.display = 'none';
	video.load();
	exists();
	// Enable this function to blob video urls
	// This protects videos from being downloaded easily
	//setBlob(video.src);
	$("#video").on('contextmenu', function() {
		return false;
	});
});

// Scramble Video Source
function setBlob(source) {
	var URL = this.window.URL || this.window.webkitURL;
	var file = new Blob(
		["file:///" + source], {
			"type": "video\/mp4"
		});
	var value = URL.createObjectURL(file);
	document.getElementById("video").src = value;
}

// Check if file exists
function exists() {
	$.ajax({
		url: video.src,
		type: 'HEAD',
		error: function() {
			video.src = 'error.mp4';
			video.autoplay = true;
			video.loop = true;
			controls.style.display = 'none';
			info.style.display = 'none';
			bigplay.style.visibility = 'hidden';
			error.style.display = '';
		},
		success: function() {
			// File Exists
		}
	});
}

// Event listener for the play/pause button
playpauseButton.addEventListener("click", function() {
	if (video.paused) {
		playpauseButton.innerHTML = '<span class="typcn typcn-media-pause"></span>';
		video.play();
	}
	else {
		playpauseButton.innerHTML = '<span class="typcn typcn-media-play"></span>';
		video.pause();
	}
});


// Event listener for the mute button
muteButton.addEventListener("click", function() {
	if (video.muted == true) {
		muteButton.innerHTML = '<span class="typcn typcn-volume-up"></span>';
		video.muted = false;
		volumeBar.value = 1;
	}
	else {
		muteButton.innerHTML = '<span class="typcn typcn-volume-mute"></span>';
		video.muted = true;
		volumeBar.value = 0;
	}
});


// Event listener for the full-screen button
fullScreenButton.addEventListener("click", function() {
	if (!document.fullscreenElement && // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		}
		else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		}
		else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		}
		else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	}
	else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
		else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}
		else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
});

// Event listener for the seek bar
seekBar.addEventListener("change", function() {
	// Calculate the new time
	var time = video.duration * (seekBar.value / 100);

	// Update the video time
	video.currentTime = time;
});


// Update the seek bar as the video plays
video.addEventListener("timeupdate", function() {

	// Calculate the slider value
	var value = (100 / video.duration) * video.currentTime;

	// Update the slider value
	seekBar.value = value;
	//slider.slider('value', value);

});

// Pause the video when the seek handle is being dragged
seekBar.addEventListener("mousedown", function() {
	video.pause();
	playpauseButton.innerHTML = '<span class="typcn typcn-media-play"></span>';
});

// Play the video when the seek handle is dropped
seekBar.addEventListener("mouseup", function() {
	video.play();
	playpauseButton.innerHTML = '<span class="typcn typcn-media-pause"></span>';
});

// Event listener for the volume bar
volumeBar.addEventListener("change", function() {
	// Update the video volume
	video.volume = volumeBar.value;
	if (volumeBar.value > 0.5) {
		muteButton.innerHTML = '<span class="typcn typcn-volume-up"></span>';
	}
	if (volumeBar.value <= 0.5) {
		muteButton.innerHTML = '<span class="typcn typcn-volume-down"></span>';
	}
	if (volumeBar.value == 0) {
		muteButton.innerHTML = '<span class="typcn typcn-volume-mute"></span>';
	}
});

function hidePlay() {
	bigplay.style.display = 'none';
	controls.style.display = '';
	video.play();
	playpauseButton.innerHTML = '<span class="typcn typcn-media-pause"></span>';

	video.addEventListener("click", function() {
		if (video.paused) {
			playpauseButton.innerHTML = '<span class="typcn typcn-media-pause"></span>';
			video.play();
		}
		else {
			playpauseButton.innerHTML = '<span class="typcn typcn-media-play"></span>';
			video.pause();
		}
	});
}

function share() {

	// Pause the video
	video.pause();
	playpauseButton.innerHTML = '<span class="typcn typcn-media-pause"></span>';

	$("sharemodal").slideToggle();
}

function shareClose() {

	// Resume the video
	video.play();
	playpauseButton.innerHTML = '<span class="typcn typcn-media-play"></span>';

	$("sharemodal").slideToggle();
}

// Duration
(function() {
	var onDurationChange = function() {
		if (video.readyState) {
			var minutes = parseInt(video.duration / 60, 10);
			var seconds = Math.round(video.duration % 60);
			if (seconds.toString().length == 1) {
				var seconds = "0" + seconds;
			}

			document.getElementById("duration").innerHTML = minutes + ":" + seconds;
		}
	};

	video.addEventListener('durationchange', onDurationChange);
	onDurationChange();
})();

// Current Time
(function() {
	var onTimeChange = function() {
		if (video.readyState) {
			var minutes = parseInt(video.currentTime / 60, 10);
			var seconds = Math.round(video.currentTime % 60);
			if (seconds.toString().length == 1) {
				var seconds = "0" + seconds;
			}

			document.getElementById("current").innerHTML = minutes + ":" + seconds;
		}
	};

	video.addEventListener('timeupdate', onTimeChange);
	onTimeChange();
})();

video.addEventListener('loadeddata', function() {
	bigplay.style.display = '';
	load.style.display = 'none';
}, false);
video.onended = function() {
	playpauseButton.innerHTML = '<span class="typcn typcn-refresh"></span>';
};

// Buffer Indication
video.onwaiting = function() {
	$("#load").fadeIn();
	setTimeout(function() {
		$("#load").fadeOut();
	}, 5000);
};

//Slider track
$(function() {

	$('.wrap').addClass('loaded');

	video.addEventListener("timeupdate", function() {
		var val = $('#seekbar').val();
		var buf = ((100 - val) / 4) + parseInt(val);
		$('#seekbar').css(
			'background',
			'linear-gradient(to right, #B259E8 0%, #B259E8 ' + val + '%, rgba(255,255,255,.5) ' + val + '%, rgba(255,255,255,.5) ' + buf + '%)'
		);
	});

	volumeBar.addEventListener("change", function() {
		var val = $('#volumebar').val();
		var buf = parseInt(val * 100);
		$('#volumebar').css(
			'background',
			'linear-gradient(to right, #B259E8 0%, #B259E8 ' + buf + '%, rgba(255,255,255,.5) ' + buf + '%, rgba(255,255,255,.5) ' + buf + '%)'
		);
	});

	muteButton.addEventListener("click", function() {
		var val = $('#volumebar').val();
		var buf = parseInt(val * 100);
		$('#volumebar').css(
			'background',
			'linear-gradient(to right, #B259E8 0%, #B259E8 ' + buf + '%, rgba(255,255,255,.5) ' + buf + '%, rgba(255,255,255,.5) ' + buf + '%)'
		);
	});

	var timeout;
	$('.wrap').bind('focusin mouseover mousedown hover', function() {
		window.clearTimeout(timeout);
		$(this).addClass('hover');
	});
	$('.wrap').bind('focusout mouseout mouseup', function() {
		window.clearTimeout(timeout);
		timeout = setTimeout(function() {
			removeHoverClass();
		}, 1000);
	});

	function removeHoverClass() {
		if (!$('.wrap').is(":hover")) {
			$('.wrap').removeClass('hover');
		}
	}

});

// Hide/show controls + info on idle
var timeout = null;

$("#video").on('mousemove', function() {
	clearTimeout(timeout);
	$("#info").fadeIn();
	$("#controls").fadeIn();
	video.style.cursor = 'default';

	timeout = setTimeout(function() {
		$("#info").fadeOut();
		$("#controls").fadeOut();
		video.style.cursor = 'none';
	}, 3000);
});

// Key Functions

//On space pressed
$(window).keypress(function(e) {
	if (e.keyCode === 0 || e.keyCode === 32) {
		e.preventDefault();
		bigplay.style.display = 'none';
		controls.style.display = '';
		if (video.paused) {
			playpauseButton.innerHTML = '<span class="typcn typcn-media-pause"></span>';
			video.play();
		}
		else {
			playpauseButton.innerHTML = '<span class="typcn typcn-media-play"></span>';
			video.pause();
		}
	}
});

// 'F' is for Fullscreen
$(window).keypress(function(e) {
	if (e.keyCode === 0 || e.keyCode === 102) {
		e.preventDefault();
		if (!document.fullscreenElement && // alternative standard method
			!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			}
			else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			}
			else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			}
			else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		}
		else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
			else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}
});

	// 'F11' is for Fullscreen
$(window).keypress(function(e) {
	if (e.keyCode === 0 || e.keyCode === 122) {
		e.preventDefault();
		if (!document.fullscreenElement && // alternative standard method
			!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			}
			else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			}
			else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			}
			else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		}
		else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
			else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}
});
