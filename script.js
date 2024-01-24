const songs = [
  {
      name: `Щедра ніч`, 
      artist: `Alyona Alyona feat Kola & Jerry Hei`,
      album: `December 2023`,
      path: `./public/songs/alyona_alyona_feat_kola__jerry_heil_-_shchedra_nich.mp3`,
      cover: `./public/images/AlonaAlona.jpg`
  },
  {
      name: `When we were young`, 
      artist: `David Guetta feat Kim Petras`,
      album: `November 2023`,
      path: `./public/songs/david_guetta_feat_kim_petras_-_when_we_were_young_the_logical_song.mp3`,
      cover: `./public/images/WhenWeWereYung.jpg`
  },
  {
      name: `Ney Na Na Na`, 
      artist: `Jakonda Nejtrino`,
      album: `November 2023`,
      path: `./public/songs/jakonda__nejtrino_-_ney_na_na_na.mp3`,
      cover: `./public/images/HeyNaNaNa.jpg`
  },
  {
      name: `Хто ти`, 
      artist: `Клавдія Петрівна & Ості`,
      album: `September 2023`,
      path: `./public/songs/klavdia_petrivna_feat_osty_-_hto_ti.mp3`,
      cover: `./public/images/HtoTy.jpg`
  },
  {
      name: `Уночі`, 
      artist: `ЯкТак`,
      album: `August 2023`,
      path: `./public/songs/yaktak_-_unochi_(z3.fm).mp3`,
      cover: `./public//images/YakTak.jpg`
  }
]
let currentPlaylist = songs;

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

const openPlayList = document.querySelector('#open-play-list');
const closePlayList = document.querySelector('#close-play-list');
const playListBlock = document.querySelector('.play-list');


// отримуємо тривалість треку в хв та сек
const songDuration = (t)=>{
  let min = Math.floor(t/60);
  min<10? min = '0'+ min : min;
  let sec = Math.floor(t%60);
  sec<10? sec = '0'+ sec : sec;
  let time = `${min}:${sec}`;
  return time;
}

// встановлюємо тривалість треку в плеєр
const setTrack = (index)=>{
  const track = currentPlaylist[index]
  songAlbum.innerText = track.album;
  songArtist.innerText = track.artist;
  songTitle.innerText = track.name;
  songImage.src = track.cover;
  audio.src = track.path;
  audio.addEventListener('loadedmetadata', () => {
    audioDuration.max = audio.duration;
    document.querySelector('.end').innerText = songDuration(audio.duration);
  });
  audio.volume = audioVolume.value/100;
}

setTrack(0)

// програти трек

playBtn.onclick = ()=>{
  audio.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide')

}

// зупинити програвання треку

pauseBtn.onclick = ()=>{
  audio.pause();
  pauseBtn.classList.add('hide');
  playBtn.classList.remove('hide')

}

// Змінюємо гучність
volumeBtn.onclick = ()=>{
  volumeArea.classList.toggle('hide');
}

audioVolume.addEventListener('input', ()=>{
  audio.volume = audioVolume.value/100;
  console.log(audioVolume.value)
  if(audioVolume.value == 0){
    volume0.classList.remove('hide');
    volumeLow.classList.add('hide');
    volumeHigh.classList.add('hide');
  } else if(audioVolume.value >0 && audioVolume.value <=20){
    volume0.classList.add('hide');
    volumeLow.classList.remove('hide');
    volumeHigh.classList.add('hide');
  } else if(audioVolume.value >20 && audioVolume.value <=100){
    volume0.classList.add('hide');
    volumeLow.classList.add('hide');
    volumeHigh.classList.remove('hide');
  }
  
})

// Наступний та попередній трек
let track = 0;

backwardBtn.onclick = ()=>{
  track<=0? track = currentPlaylist.length - 1 : track--
  setTrack(track);
  playBtn.click();
}

forwardBtn.onclick = ()=>{
  track == currentPlaylist.length -1? track = 0 : track++
  setTrack(track);
  playBtn.click();
}

// Перемішування треків

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffleBtn.onclick = ()=>{
  currentPlaylist = shuffleArray(songs)
}

// Ручна прокрутка треку
setInterval(()=>{
  audioDuration.value = audio.currentTime;
  document.querySelector('.start').innerText = songDuration(audio.currentTime);
  if(audioDuration.max == audio.currentTime) forwardBtn.click();
}, 1000)

// Атвоматичне перемикання треків
audioDuration.addEventListener('input', ()=>{
  audio.currentTime = audioDuration.value;
})


// Відкривання списку треків

openPlayList.onclick = ()=>{
  playListBlock.classList.add('open-list');
}

// Закриття списку треків

closePlayList.onclick = ()=>{
  playListBlock.classList.remove('open-list');
}