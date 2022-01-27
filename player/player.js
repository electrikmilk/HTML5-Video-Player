// Video element
const video = document.querySelector("video");

// General elements
const init = document.querySelector(".init-user-interaction");
const controls = document.querySelector(".controls");

// Buttons
const playButton = document.querySelector("#playButton");
const pauseButton = document.querySelector("#pauseButton");
const muteButton = document.querySelector("#muteButton");
const pipButton = document.querySelector("#pipButton");
const fullscreenButton = document.querySelector("#fullscreenButton");

// Toggles
const loopToggle = document.querySelector("#loop");

// Sliders
const seekBar = document.querySelector("#seekBar");
const volumeBar = document.querySelector("#volumeBar");

// Menus
const playbackRate = document.querySelector("#playbackRate");

// Statuses
const currentTime = document.querySelector("#currentTime");
const currentDuration = document.querySelector("#currentDuration");
const currentVolume = document.querySelector("#currentVolume");

/*
On load:
	- Turn off the default controls
	- Set the `defaultPlaybackRate`
 */
window.onload = function() {
  video.controls = false;
  // video.autoplay = true;
  video.defaultPlaybackRate = 1.0;
  video.src = video.src + "#t=0.1";
  video.load();
};

video.onload = function() {
  // when the video loads...
};

// Disable right-click menu
document.oncontextmenu = function(e) {
  e.preventDefault();
};

// Event listener for large play button which initializes user interaction which some browsers require
init.addEventListener("click", function() {
  controls.style.visibility = 'visible';
  this.style.display = 'none';
  play_pause();
});

// On video error...
video.onerror = function() {
  console.error("(" + video.error.code + "): " + video.error.message);
  alert('Unable to play video');
  video.src = 'error.mp4';
  video.loop = true;
  init.style.display = 'none';
  video.play();
  window.stop();
};

// When clicking video, toggle play/pause
video.addEventListener("click", function() {
  play_pause();
});

// Event listener for duration change
video.addEventListener("onDurationChange", function() {
  if (video.readyState) {
    let minutes = parseInt(video.duration / 60, 10);
    let seconds = Math.round(video.duration % 60);
    if (seconds.toString().length === 1) {
      seconds = "0" + seconds;
    }
    currentDuration.innerHTML = minutes + ":" + seconds;
  }
});

// Event listener for play button
playButton.addEventListener("click", function() {
  this.style.display = 'none';
  pauseButton.style.display = 'block';
  video.play();
});

// Event listener for pause button
pauseButton.addEventListener("click", function() {
  playButton.style.display = 'block';
  this.style.display = 'none';
  video.pause();
});

// Update current position in the video
seekBar.addEventListener("change", function() {
  // Calculate and update the new time
  video.currentTime = video.duration * (seekBar.value / 100);
});

// Update the seek bar as the video plays
video.addEventListener("timeupdate", function() {
  // Calculate and update the slider value
  seekBar.value = (100 / video.duration) * video.currentTime;
});

// Event listener for the mute button
muteButton.addEventListener("click", function() {
  if (video.muted === true) {
    video.muted = false;
    volumeBar.value = 1;
    muteButton.innerHTML = "<span class=\"fas fa-volume-up\"></span>";
  } else {
    video.muted = true;
    volumeBar.value = 0;
    muteButton.innerHTML = "<span class=\"fas fa-volume-mute\"></span>";
  }
});

// Event listener for the volume bar
volumeBar.addEventListener("change", function() {
  // Update the video volume
  video.volume = volumeBar.value;
  if (volumeBar.value > 0.5) {
    muteButton.innerHTML = "<span class=\"fas fa-volume-up\"></span>";
  }
  if (volumeBar.value <= 0.5) {
    muteButton.innerHTML = "<span class=\"fas fa-volume-down\"></span>";
  }
  if (volumeBar.value === 0) {
    muteButton.innerHTML = "<span class=\"fas fa-volume-mute\"></span>";
  }
});

// Event listener for playbackRate change
playbackRate.addEventListener("change", function() {
  video.playbackRate = this.value;
});

// Event listener for the loop checkbox
loopToggle.addEventListener("change", function() {
  video.loop = this.checked;
});

// Event listener for the picture-in-picture button
pipButton.addEventListener("click", function() {
  video.requestPictureInPicture();
});

// Event listener for the fullscreen button
fullscreenButton.addEventListener("click", function() {
  fullscreen();
});

// Event listener for key presses
document.addEventListener("keypress", function(e) {
  e.preventDefault();
  // Spacebar for play/pause
  if (e.code === 32) {
    play_pause();
  }
  // 'F' or `F11` for fullscreen
  if (e.code === 102 || e.code === 122) {
    fullscreen();
  }
});

// Duration
(function() {
  let onDurationChange = function() {
    if (video.readyState) {
      let minutes = parseInt(video.duration / 60, 10);
      let seconds = Math.round(video.duration % 60);
      if (seconds.toString().length === 1) {
        seconds = "0" + seconds;
      }
      currentDuration.innerHTML = minutes + ":" + seconds;
    }
  };
  video.addEventListener("durationchange", onDurationChange);
  onDurationChange();
})();

// Current Time
(function() {
  let onTimeChange = function() {
    if (video.readyState) {
      let minutes = parseInt(video.currentTime / 60, 10);
      let seconds = Math.round(video.currentTime % 60);
      if (seconds.toString().length === 1) {
        seconds = "0" + seconds;
      }
      currentTime.innerHTML = minutes + ":" + seconds;
    }
  };
  video.addEventListener("timeupdate", onTimeChange);
  onTimeChange();
})();

// Function to toggle play/pause
function play_pause() {
  if (video.paused === true) {
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    video.play();
  } else {
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
    video.pause();
  }
}

function fullscreen() {
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
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