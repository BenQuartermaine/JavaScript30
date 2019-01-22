// DOM ELEMENTS
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const playerVideo = player.querySelector('player__video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// FUNCTIONS

function togglePlay() {
  video.paused ? video.play() : video.pause();
};

function updatePlay() {
  const icon = this.paused ? "Paused" : "Playing";
  toggle.textContent = icon;
};

function spaceBar(e) {
  if (e.keyCode === 32) return togglePlay();
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeChange() {
  // this.name works because the 'name' in HTML is === video methods
  video[this.name] = this.value;
};

function timeElapsed() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
  const position = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = position;
};


// EVENT LISTENERS

// Play/pause for click, click on video & spacebar;
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlay);
video.addEventListener('pause', updatePlay);
document.addEventListener('keyup', spaceBar); 

// Skip button related listeners;
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

// Range change for speed and volume listeners;
ranges.forEach(range => range.addEventListener('change', handleRangeChange));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeChange));

// Video time progress bar listeners;
video.addEventListener('timeupdate', timeElapsed);
progress.addEventListener('click', scrub);
let mouseDown = false
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);










