const song_title=document.querySelector('.reproductor h1');
const artist=document.querySelector('.reproductor p');

const duracionSlider=document.getElementById('duracion-slider');
const duracion_actual= document.getElementById("duracion-actual")
const duracion_total= document.getElementById("duracion-song")
const song=document.getElementById('cancion');

const control=document.getElementById('ctrl');
const repausar=document.querySelector('.botones button.btn-inicio-pausa');


const rewind=document.querySelector('.botones button.atras');
const forward=document.querySelector('.botones button.siguiente');

const carpetas=document.getElementById('carpetas_input');
const carpetas_post=document.getElementById('cargar_btn');
const carpetas_get=document.getElementById('carpeta_estado');

//const autoplay=false;

//canciones

const songs=[
    {
        titulo:'American Beauty',
        nombre:'Cormega',
        fuente:'music/02. Cormega - American Beauty.flac'
    },
    {
        titulo:'Pimp In My Own Rhyme',
        nombre:'8Ball & MJG',
        fuente:'music/02. Pimp In My Own Rhyme.mp3'
    },
    {
        titulo:'Gunn Clapp',
        nombre:'O.G.C',
        fuente:'music/05. Gunn Clapp.mp3'
    },
    {
        titulo:'Venetian Loafers',
        nombre:'Meyhem Lauren',
        fuente:'music/5. Meyhem Lauren - Venetian Loafers.flac'
    },
    {
        titulo:'Shootouts',
        nombre:'Nas',
        fuente:'music/12. Shootouts.mp3'
    }
];

let indiceActual= 0;

function formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}


function cargarSong() {
    artist.textContent = songs[indiceActual].nombre;
    const item=songs[indiceActual];
    song.src=item.fuente;
    song_title.textContent = item.titulo;
    song.load();

};

cargarSong();

function actualizarInfoSong(){
    song_title.textContent=songs[indiceActual].titulo;
    artist.textContent=songs[indiceActual].nombre;
    song.src=songs[indiceActual].fuente;
    song.addEventListener('loadeddata', function(){});
};


repausar.addEventListener("click", stop_n_play);

function stop_n_play() {
    if (song.paused) {
        reproducir();
    }else{
        pausar();
    }
}


function reproducir() {
    song.play();
    control.classList.add('bi-pause-circle-fill')
    control.classList.remove('bi-play-circle-fill')
}

function pausar() {
    song.pause();
    control.classList.remove('bi-pause-circle-fill')
    control.classList.add('bi-play-circle-fill')
}

song.addEventListener('timeupdate', function (){
    duracionSlider.value=song.currentTime;
    duracion_actual.textContent = formatTime(duracionSlider.value)

});

song.addEventListener('loadedmetadata', ()=>{
    duracionSlider.max=song.duration;
    duracion_total.textContent=formatTime(song.duration);
});


//funcion(){} == ()=>{}

duracionSlider.addEventListener('input',()=>{
    song.currentTime=duracionSlider.value;
});

duracionSlider.addEventListener('change',function(){
    reproducir();
});

forward.addEventListener('click', ()=>{
    indiceActual=(indiceActual+1) % songs.length;
    actualizarInfoSong();
    reproducir();
});

rewind.addEventListener('click', function(){
    indiceActual=(indiceActual - 1 + songs.length) % songs.length;
    actualizarInfoSong();
    reproducir();
});

song.addEventListener('ended', ()=>{
    indiceActual=(indiceActual + 1 ) % songs.length;
    actualizarInfoSong();
    reproducir();
});



actualizarInfoSong();

//console.log(song_title);