const songList = document.getElementById('song-list');
const addSongForm = document.getElementById('add-song-form');

let songs = [];

// Load songs from local storage
if (localStorage.getItem('songs')) {
    songs = JSON.parse(localStorage.getItem('songs'));
    renderSongList();
}

addSongForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const songName = document.getElementById('song-name').value;
    const artist = document.getElementById('artist').value;
    addSong(songName, artist);
    document.getElementById('song-name').value = '';
    document.getElementById('artist').value = '';
});

function addSong(songName, artist) {
    const song = { id: Date.now(), songName, artist };
    songs.push(song);
    localStorage.setItem('songs', JSON.stringify(songs));
    renderSongList();
}

function renderSongList() {
    songList.innerHTML = '';
    songs.forEach((song) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${song.songName} by ${song.artist}</span>
            <button class="edit-button" data-id="${song.id}">Edit</button>
            <button class="delete-button" data-id="${song.id}">Delete</button>
        `;
        songList.appendChild(li);
    });
}

songList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-button')) {
        const songId = e.target.dataset.id;
        const song = songs.find((song) => song.id === parseInt(songId));
        const editForm = document.createElement('form');
        editForm.innerHTML = `
            <label for="edit-song-name">Song Name:</label>
            <input type="text" id="edit-song-name" value="${song.songName}">
            <label for="edit-artist">Artist:</label>
            <input type="text" id="edit-artist" value="${song.artist}">
            <button type="submit">Save</button>
        `;
        const li = e.target.parentNode;
        songList.replaceChild(editForm, li);
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            song.songName = document.getElementById('edit-song-name').value;
            song.artist = document.getElementById('edit-artist').value;
            localStorage.setItem('songs', JSON.stringify(songs));
            renderSongList();
        });
    } else if (e.target.classList.contains('delete-button')) {
        const songId = e.target.dataset.id;
        songs = songs.filter((song) => song.id !== parseInt(songId));
        localStorage.setItem('songs', JSON.stringify(songs));
        renderSongList();
    }
});
