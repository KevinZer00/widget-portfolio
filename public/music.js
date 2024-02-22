// Initialize the Web Audio API context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Get the audio element and the source node
const audioElement = document.getElementById('audioPlayer');
const track = audioCtx.createMediaElementSource(audioElement);
const volumeSlider = document.getElementById('volume-slider');

function updateVolumeSliderColor() {
    const volumeSliderColor = themes[currentTheme].volumeSliderColor;
    setTimeout(() => {
        volumeSlider.style.background = `linear-gradient(to right, ${volumeSliderColor} ${volumeSlider.value * 100}%, #333 ${volumeSlider.value * 100}%)`;
    }, 0);
}


audioElement.volume = 0.5; // Set the initial volume to 0.5 (50%)
updateVolumeSliderColor(); // Set the initial volume slider color

volumeSlider.addEventListener('input', function() {
    audioElement.volume = this.value;
    updateVolumeSliderColor(); // Update the volume slider color
});

// Connect the audio node to the destination (speakers)
track.connect(audioCtx.destination);

var currentTrackIndex = 0;
var tracks = [
    { title: 'Fresh', artist: 'Alex-Productions', file: '/assets/track1.mp3' },
    { title: 'Colorful Flowers', artist: 'Tokyo Music Walker', file: '/assets/track2.mp3' },
    { title: 'Purple Dream', artist: 'Ghostrifter Official', file: '/assets/track3.mp3' },
    { title: 'When I Was a Boy', artist: 'Toyko Music Walker', file: '/assets/track4.mp3' },
    { title: 'Morning Routine', artist: 'Ghostrifter Official', file: '/assets/track5.mp3' }
    // Add more tracks as needed
];


// Function to toggle play and pause
function togglePlayPause() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
    updatePlayPauseButton(); // Update the play/pause button's icon
}

function updatePlayPauseButton() {
    const playPauseBtn = document.getElementById('play-pause');
    if (audioElement.paused) {
        playPauseBtn.innerHTML = '&#9658;'; // Play icon
    } else {
        playPauseBtn.innerHTML = '&#10074;&#10074;'; // Pause icon
    }
}



// Function to change the track
function changeTrack(direction) {
    currentTrackIndex = (currentTrackIndex + direction + tracks.length) % tracks.length;
    const newTrack = tracks[currentTrackIndex];

    audioElement.src = newTrack.file;
    audioElement.play(); // Start playing the new track
    document.getElementById('song-title').textContent = newTrack.title;
    document.getElementById('song-artist').textContent = newTrack.artist;
    updatePlayPauseButton(); // Update the play/pause button's icon
}

audioElement.onended = function () {
    changeTrack(1); // Go to the next track
};

// Create an analyser node
const analyser = audioCtx.createAnalyser();
track.connect(analyser);
analyser.connect(audioCtx.destination);

// Set up the visualizer array
const dataArray = new Uint8Array(analyser.frequencyBinCount);



function drawEqualizer() {
    requestAnimationFrame(drawEqualizer);

    analyser.getByteFrequencyData(dataArray);

    const canvas = document.getElementById('equalizer');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    // Center line position
    const centerY = canvas.height / 2;

    for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i];

        // Draw the top half
        ctx.fillStyle = equalizerColor; // Color for the top half
        ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight / 2);

        // Draw the bottom half (optional, if you want it to reflect the top half)
        ctx.fillStyle = equalizerColor; // Color for the bottom half, possibly with lower opacity
        ctx.fillRect(x, centerY, barWidth, barHeight / 2);

        x += barWidth + 1;
    }
}

// Set up the initial track
changeTrack(0);

// Start the visualizer
document.addEventListener('DOMContentLoaded', function () {

    drawEqualizer();
});


