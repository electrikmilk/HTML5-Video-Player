// Video element
let video = document.getElementById("video");

// Buttons
let playpauseButton = document.getElementById("playpause");
let muteButton = document.getElementById("mute");
let fullScreenButton = document.getElementById("fullscreen");

// Sliders
let seekBar = document.getElementById("seekbar");
let volumeBar = document.getElementById("volumebar");

// Misc
let controls = document.getElementById("controls");
let info = document.getElementById("info");
let bigplay = document.getElementById("bigplay");
let error = document.getElementById("error");
let load = document.getElementById("load");
let refresh = document.getElementById("refresh");



window.onload = function() {
	controls.style.visibility = "hidden";
	bigplay.style.display = "none";

};

document.oncontextmenu = function(e) {
	e.preventDefault();
};

video.onerror = function() {
	console.error("("+video.error.code+"): "+video.error.message);
	video.src = 'error.mp4';
	alert('Unable to play video');
	window.stop();
};

$(document).ready(function () {
	// Init
	$("#sharemodal").hide();
	$("#load").hide();

	video.load();
	//setBlob(video.src);
	// Disable right-click
	$("#video").on("contextmenu", function () {
		return false;
	});
});

// Scramble Video Source
function setBlob(file) {
	obUrl = URL.createObjectURL(file);
	document.getElementById("video").setAttribute("src", obUrl);
}

// Event listener for the play/pause button
playpauseButton.addEventListener("click", function () {
	if (video.paused) {
		playpauseButton.innerHTML = "<i class='fas fa-pause'></i>";
		video.play();
	} else {
		playpauseButton.innerHTML = "<i class='fas fa-play'></i>";
		video.pause();
	}
});


// Event listener for the mute button
muteButton.addEventListener("click", function () {
	if (video.muted === true) {
		muteButton.innerHTML = "<span class=\"typcn typcn-volume-up\"></span>";
		video.muted = false;
		volumeBar.value = 1;
		// $("#mute").attr("tooltip", "Mute");
	} else {
		muteButton.innerHTML = "<span class=\"typcn typcn-volume-mute\"></span>";
		video.muted = true;
		volumeBar.value = 0;
		// $("#mute").attr("tooltip", "Unmute");
	}
});


// Event listener for the full-screen button
fullScreenButton.addEventListener("click", function () {
	if (!document.fullscreenElement && // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
		$("#fullscreen").attr("tooltip", "Exit Fullscreen");
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		$("#fullscreen").attr("tooltip", "Go Fullscreen");
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
});

// Update current position in the video
seekBar.addEventListener("change", function () {
	// Calculate and update the new time
	video.currentTime = video.duration * (seekBar.value / 100);
});

// Update the seek bar as the video plays
video.addEventListener("timeupdate", function () {
	// Calculate and update the slider value
	seekBar.value = (100 / video.duration) * video.currentTime;
});

// Pause the video when the seek handle is being dragged
seekBar.addEventListener("mousedown", function () {
	video.pause();
	playpauseButton.innerHTML = "<span class=\"typcn typcn-media-play\"></span>";
});

// Play the video when the seek handle is dropped
seekBar.addEventListener("mouseup", function () {
	video.play();
	playpauseButton.innerHTML = "<span class=\"typcn typcn-media-pause\"></span>";
});

// Event listener for the volume bar
volumeBar.addEventListener("change", function () {
	// Update the video volume
	video.volume = volumeBar.value;
	if (volumeBar.value > 0.5) {
		muteButton.innerHTML = "<span class=\"typcn typcn-volume-up\"></span>";
	}
	if (volumeBar.value <= 0.5) {
		muteButton.innerHTML = "<span class=\"typcn typcn-volume-down\"></span>";
	}
	if (volumeBar.value === 0) {
		muteButton.innerHTML = "<span class=\"typcn typcn-volume-mute\"></span>";
	}
});

function hidePlay() {
	bigplay.style.display = "none";
	controls.style.visibility = "visible";
	video.play();
	playpauseButton.innerHTML = "<span class=\"typcn typcn-media-pause\"></span>";

	video.addEventListener("click", function () {
		if (video.paused) {
			playpauseButton.innerHTML = "<span class=\"typcn typcn-media-pause\"></span>";
			video.play();
		} else {
			playpauseButton.innerHTML = "<span class=\"typcn typcn-media-play\"></span>";
			video.pause();
		}
	});
}

// Duration
(function () {
	let onDurationChange = function () {
		if (video.readyState) {
			let minutes = parseInt(video.duration / 60, 10);
			let seconds = Math.round(video.duration % 60);
			if (seconds.toString().length === 1) {
				seconds = "0" + seconds;
			}
			document.getElementById("duration").innerHTML = minutes + ":" + seconds;
		}
	};
	video.addEventListener("durationchange", onDurationChange);
	onDurationChange();
})();

// Current Time
(function () {
	let onTimeChange = function () {
		if (video.readyState) {
			let minutes = parseInt(video.currentTime / 60, 10);
			let seconds = Math.round(video.currentTime % 60);
			if (seconds.toString().length === 1) {
				seconds = "0" + seconds;
			}
			document.getElementById("current").innerHTML = minutes + ":" + seconds;
		}
	};

	video.addEventListener("timeupdate", onTimeChange);
	onTimeChange();
})();

video.addEventListener("loadeddata", function () {
	bigplay.style.display = "";
	load.style.display = "none";
}, false);
video.onended = function () {
	playpauseButton.innerHTML = "<span class=\"typcn typcn-refresh\"></span>";
	// update video plays...
	// recommend other videos...
};

// Buffer Indication
video.onwaiting = function () {
	$("#load").fadeIn();
	setTimeout(function () {
		$("#load").fadeOut();
	}, 5000);
};

//Slider track
$(function () {
	$(".wrap").addClass("loaded");
	video.addEventListener("timeupdate", function () {
		let val = $("#seekbar").val();
		let buf = ((100 - val) / 4) + parseInt(val);
		$("#seekbar").css(
			"background",
			"linear-gradient(to right, #de2233 0%, #de2233 " + val + "%, rgba(255,255,255,.5) " + val + "%, rgba(255,255,255,.5) " + buf + "%)"
		);
	});
	volumeBar.addEventListener("change", function () {
		let val = $("#volumebar").val();
		let buf = parseInt(val * 100);
		$("#volumebar").css(
			"background",
			"linear-gradient(to right, #de2233 0%, #de2233 " + buf + "%, rgba(255,255,255,.5) " + buf + "%, rgba(255,255,255,.5) " + buf + "%)"
		);
	});
	muteButton.addEventListener("click", function () {
		let val = $("#volumebar").val();
		let buf = parseInt(val * 100);
		$("#volumebar").css(
			"background",
			"linear-gradient(to right, #de2233 0%, #de2233 " + buf + "%, rgba(255,255,255,.5) " + buf + "%, rgba(255,255,255,.5) " + buf + "%)"
		);
	});
	let timeout;
	$(".wrap").bind("focusin mouseover mousedown hover", function () {
		window.clearTimeout(timeout);
		$(this).addClass("hover");
	});
	$(".wrap").bind("focusout mouseout mouseup", function () {
		window.clearTimeout(timeout);
		timeout = setTimeout(function () {
			removeHoverClass();
		}, 1000);
	});
	function removeHoverClass() {
		if (!$(".wrap").is(":hover")) {
			$(".wrap").removeClass("hover");
		}
	}
});

// Hide/show controls + info on idle
let timeout = null;

$("#video").on("mousemove", function () {
	clearTimeout(timeout);
	$("#info").fadeIn();
	$("#controls").fadeIn();
	video.style.cursor = "default";
	timeout = setTimeout(function () {
		$("#info").fadeOut();
		$("#controls").fadeOut();
		video.style.cursor = "none";
	}, 3000);
});

// Key Functions

//On space pressed
$(window).keypress(function (e) {
	if (e.keyCode === 0 || e.keyCode === 32) {
		e.preventDefault();
		bigplay.style.display = "none";
		controls.style.display = "";
		if (video.paused) {
			playpauseButton.innerHTML = "<span class=\"typcn typcn-media-pause\"></span>";
			video.play();
		} else {
			playpauseButton.innerHTML = "<span class=\"typcn typcn-media-play\"></span>";
			video.pause();
		}
	}
});

// 'F' is for Fullscreen
$(window).keypress(function (e) {
	if (e.keyCode === 0 || e.keyCode === 102) {
		e.preventDefault();
		if (!document.fullscreenElement && // alternative standard method
			!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
			$("#fullscreen").attr("tooltip", "Exit Fullscreen");
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			$("#fullscreen").attr("tooltip", "Go Fullscreen");
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}
});

// 'F11' is for Fullscreen
$(window).keypress(function (e) {
	if (e.keyCode === 0 || e.keyCode === 122) {
		e.preventDefault();
		if (!document.fullscreenElement && // alternative standard method
			!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
			$("#fullscreen").attr("tooltip", "Exit Fullscreen");
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			$("#fullscreen").attr("tooltip", "Go Fullscreen");
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}
});