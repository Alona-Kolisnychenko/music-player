const songs = [
  {
    name: `Щедра ніч`,
    artist: `Alyona Alyona feat Kola & Jerry Hei`,
    album: `December 2023`,
    path: `./public/songs/alyona_alyona_feat_kola__jerry_heil_-_shchedra_nich.mp3`,
    cover: `./public/images/AlonaAlona.jpg`,
    id: 1,
  },
  {
    name: `When we were young`,
    artist: `David Guetta feat Kim Petras`,
    album: `November 2023`,
    path: `./public/songs/david_guetta_feat_kim_petras_-_when_we_were_young_the_logical_song.mp3`,
    cover: `./public/images/WhenWeWereYung.jpg`,
    id: 2,
  },
  {
    name: `Ney Na Na Na`,
    artist: `Jakonda Nejtrino`,
    album: `November 2023`,
    path: `./public/songs/jakonda__nejtrino_-_ney_na_na_na.mp3`,
    cover: `./public/images/HeyNaNaNa.jpg`,
    id: 3,
  },
  {
    name: `Хто ти`,
    artist: `Клавдія Петрівна & Ості`,
    album: `September 2023`,
    path: `./public/songs/klavdia_petrivna_feat_osty_-_hto_ti.mp3`,
    cover: `./public/images/HtoTy.jpg`,
    id: 4,
  },
  {
    name: `Уночі`,
    artist: `ЯкТак`,
    album: `August 2023`,
    path: `./public/songs/yaktak_-_unochi_(z3.fm).mp3`,
    cover: `./public//images/YakTak.jpg`,
    id: 5,
  },
];

let currentPlaylist = [... songs];

// отримуємо доступ до елементів

const audio = document.querySelector('audio');
const audioDuration = document.querySelector('#duration');
const audioVolume = document.querySelector('#volume-change');

const backwardBtn = document.querySelector('#backward');
const forwardBtn = document.querySelector('#forward');
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
const shuffleBtn = document.querySelector('#shuffle');

const volumeBtn = document.querySelector('.volume');
const volumeArea = document.querySelector('#volume-area');
const volume0 = document.querySelector('.fa-volume-xmark');
const volumeLow = document.querySelector('.fa-volume-low');
const volumeHigh = document.querySelector('.fa-volume-high');

const songTitle = document.getElementById('song-title');
const songAlbum = document.querySelector('#song-album span');
const songArtist = document.getElementById('song-artist');
const songImage = document.getElementById('image');
const songImageAtl = document.querySelector('.fa-music');

const openPlayList = document.querySelector('#open-play-list');
const closePlayList = document.querySelector('#close-play-list');
const playListBlock = document.querySelector('.play-list');
const playList = document.querySelector('#list');
const resetBtn = document.querySelector('#reset-btn');

// Генерація плейлиста

const fullPlayList = (songId) => {
  playList.innerHTML = '';
  currentPlaylist.forEach((item) => {
    const songItem = document.createElement('li');
    if (songId == item.id) {
      songItem.className = 'active-song';
    }
    songItem.innerHTML = `
      <div class="song">
        <p class="title" id=${item.id}>${item.name} - ${item.artist}</p>
        <i class="fa-solid fa-xmark"></i>
      </div>
    `;
    playList.appendChild(songItem);
  });
};

// отримуємо тривалість треку в хв та сек

const songDuration = (t) => {
  let min = Math.floor(t / 60);
  min < 10 ? (min = '0' + min) : min;
  let sec = Math.floor(t % 60);
  sec < 10 ? (sec = '0' + sec) : sec;
  let time = `${min}:${sec}`;
  return time;
};

// Встановлюємо поточний трек в плеєр

const setTrack = (index) => {
  const track = currentPlaylist[index];
  songAlbum.innerText = track.album;
  songArtist.innerText = track.artist;
  songTitle.innerText = track.name;
  if (track.cover) {
    songImage.classList.remove('hide');
    songImageAtl.classList.add('hide');
    songImage.src = track.cover;
  } else {
    songImage.classList.add('hide');
    songImageAtl.classList.remove('hide');
  }

  audio.src = track.path;
  audio.addEventListener('loadedmetadata', () => {
    audioDuration.max = audio.duration;
    document.querySelector('.end').innerText = songDuration(audio.duration);
  });
  audio.volume = audioVolume.value / 100;
  fullPlayList(track.id);
};

fullPlayList(songs[0].id);
setTrack(0);

// програти трек

playBtn.onclick = () => {
  audio.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
};

// зупинити програвання треку

pauseBtn.onclick = () => {
  audio.pause();
  pauseBtn.classList.add('hide');
  playBtn.classList.remove('hide');
};

// Змінюємо гучність
volumeBtn.onclick = () => {
  volumeArea.classList.toggle('hide');
};

audioVolume.addEventListener('input', () => {
  audio.volume = audioVolume.value / 100;
  if (audioVolume.value == 0) {
    volume0.classList.remove('hide');
    volumeLow.classList.add('hide');
    volumeHigh.classList.add('hide');
  } else if (audioVolume.value > 0 && audioVolume.value <= 20) {
    volume0.classList.add('hide');
    volumeLow.classList.remove('hide');
    volumeHigh.classList.add('hide');
  } else if (audioVolume.value > 20 && audioVolume.value <= 100) {
    volume0.classList.add('hide');
    volumeLow.classList.add('hide');
    volumeHigh.classList.remove('hide');
  }
});

// Наступний та попередній трек
let track = 0;

backwardBtn.onclick = () => {
  track <= 0 ? (track = currentPlaylist.length - 1) : track--;
  setTrack(track);
  playBtn.click();
};

forwardBtn.onclick = () => {
  track == currentPlaylist.length - 1 ? (track = 0) : track++;
  setTrack(track);
  playBtn.click();
};


// Атвоматичне перемикання треків
setInterval(() => {
  audioDuration.value = audio.currentTime;
  document.querySelector('.start').innerText = songDuration(audio.currentTime);
  if (audioDuration.max == audio.currentTime) forwardBtn.click();
}, 1000);

// Ручна прокрутка треку
audioDuration.addEventListener('input', () => {
  audio.pause()
  audio.currentTime = audioDuration.value;
});
audioDuration.addEventListener('change', () => {
  audio.play()
});

// Відкривання списку треків

openPlayList.onclick = () => {
  playListBlock.classList.add('open-list');
};

// Закриття списку треків

closePlayList.onclick = () => {
  playListBlock.classList.remove('open-list');
};
// Програвання треку з плейлиста

playList.onclick = (event) => {
  if (event.target.className == 'title') {
    const list = Array.from(playList.querySelectorAll('li'));
    const trackId = list.indexOf(event.target.parentElement.parentElement);
    setTrack(trackId);
    track = trackId;
    playBtn.click();
  }
};

// Визначення id поточного треку
const getCurrentSongId = () => {
  const currentSongLi = playList.querySelector('.active-song');
  return currentSongLi?.querySelector('.title').id;
};

// Перемішевання треків
function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffleBtn.onclick = () => {
  currentPlaylist = shuffleArray(currentPlaylist);
  fullPlayList(getCurrentSongId());
};

// Генеруємо випадове id

function generateUniqueId() {
  const randomPart = Math.random().toString(36).substr(2, 6);
  const datePart = new Date().getTime().toString(36);
  return randomPart + datePart;
}

// Додавання власного файлу в прейлист
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFileSelect);
function handleFileSelect(event) {
  const selectedFile = event.target.files[0];
  const uniqId = generateUniqueId();
  if (selectedFile) {
    const fileURL = URL.createObjectURL(selectedFile);
    const newTrack = {
      name: selectedFile.name,
      artist: 'Unknown Artist',
      album: 'Unknown Album',
      path: fileURL,
      cover: '',
      id: uniqId,
    };
    currentPlaylist.push(newTrack);
    fullPlayList(-1);
  }
}

// Видалення треку з плейліста

playList.addEventListener('click', (event) => {
  if (event.target.tagName == 'I') {
    const list = Array.from(playList.querySelectorAll('li'));
    const trackIndex = list.indexOf(event.target.parentElement.parentElement);
    const el = event.target.parentElement.parentElement;
    if (el.className == 'active-song') {
      if (trackIndex < currentPlaylist.length - 1) {
        setTrack(trackIndex + 1);
      } else setTrack(0);
      playBtn.click();
    }

    currentPlaylist.splice(trackIndex, 1);
    fullPlayList(getCurrentSongId());
  }
});



resetBtn.onclick = () => {
  currentPlaylist = [... songs];
  fullPlayList(songs[0].id);
};
