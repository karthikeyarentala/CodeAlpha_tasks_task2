// script.js
const playlist = [
    { title: "Song 1", category: "Duet", src: "song1.mp3" },
    { title: "Song 2", category: "Devotional", src: "song2.mp3" },
    { title: "Song 3", category: "Motivational", src: "song3.mp3" },
    { title: "Song 4", category: "Classical", src: "song4.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;
let filteredPlaylist = [...playlist];
const audio = new Audio();

audio.onended = () => playNext();

function loadPlaylist(songs = playlist) {
    const playlistElement = document.getElementById("playlist");
    playlistElement.innerHTML = "";
    songs.forEach((track, index) => {
        const li = document.createElement("li");
        li.textContent = track.title;
        li.onclick = () => playTrack(index, songs);
        playlistElement.appendChild(li);
    });
    filteredPlaylist = songs;
}

function playTrack(index, songs = filteredPlaylist) {
    currentTrackIndex = index;
    audio.src = songs[currentTrackIndex].src;
    document.getElementById("track-info").textContent = `Playing: ${songs[currentTrackIndex].title}`;
    audio.play();
    isPlaying = true;
    document.getElementById("play-pause").textContent = "⏸";
}

function togglePlayPause(forcePlay = false) {
    const playPauseButton = document.getElementById("play-pause");
    if (forcePlay || !isPlaying) {
        audio.play();
        isPlaying = true;
        playPauseButton.textContent = "⏸";
    } else {
        audio.pause();
        isPlaying = false;
        playPauseButton.textContent = "▶";
    }
}

function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % filteredPlaylist.length;
    playTrack(currentTrackIndex, filteredPlaylist);
}

function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + filteredPlaylist.length) % filteredPlaylist.length;
    playTrack(currentTrackIndex, filteredPlaylist);
}

function setVolume(value) {
    audio.volume = value;
}

function filterCategory(category) {
    const filtered = playlist.filter(track => track.category === category);
    loadPlaylist(filtered);
    if (filtered.length > 0) {
        playTrack(0, filtered);
    }
}

loadPlaylist();
