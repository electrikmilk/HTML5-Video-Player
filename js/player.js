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
		$("#sharemodal").hide();
		controls.style.display = 'none';
		bigplay.style.display = 'none';
		video.load();
	});

	// Check if file exists
	$(document).ready(function() {
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
	});

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
		if (video.requestFullscreen) {
			video.requestFullscreen();
		}
		else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen(); // Firefox
		}
		else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen(); // Chrome and Safari
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

		// Pause the video
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

	//Slider track

	$(function() {

		$('.wrap').addClass('loaded');

		video.addEventListener("timeupdate", function() {
			var val = $('#seekbar').val();
			var buf = ((100 - val) / 4) + parseInt(val);
			$('#seekbar').css(
				'background',
				'linear-gradient(to right, #3498db 0%, #3498db ' + val + '%, rgba(255,255,255,.5) ' + val + '%, rgba(255,255,255,.5) ' + buf + '%)'
			);
		});

		volumeBar.addEventListener("change", function() {
			var val = $('#volumebar').val();
			var buf = parseInt(val * 100);
			$('#volumebar').css(
				'background',
				'linear-gradient(to right, #3498db 0%, #3498db ' + buf + '%, rgba(255,255,255,.5) ' + buf + '%, rgba(255,255,255,.5) ' + buf + '%)'
			);
		});

		muteButton.addEventListener("click", function() {
			var val = $('#volumebar').val();
			var buf = parseInt(val * 100);
			$('#volumebar').css(
				'background',
				'linear-gradient(to right, #3498db 0%, #3498db ' + buf + '%, rgba(255,255,255,.5) ' + buf + '%, rgba(255,255,255,.5) ' + buf + '%)'
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