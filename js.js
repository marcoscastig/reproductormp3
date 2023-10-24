
const lista = document.getElementById('lista');
const base = document.getElementById('base');
const foto = document.getElementById('foto');
let objetoPlaylist = []
const reproductorAudio = document.getElementById('reproductorAudio');

//Listas de reproducción (se pueden agregar aca mas generos, hay que sumar botones)
const list = {
  //Las canciones deben usar camelcase
  rock: ["pirata","naufrago", "nadaEsGratisEnLaVida", "whatsername","elPibeDeLosAstilleros","malaVida","hotelCalifornia","campanasEnLaNoche"],
  cumbia: ["18KilatesQueVasAHacer","elCuisPinata","elGucciLostOnYou"],
  regeton: ["fanaticaDeLoSensual", "ellaMeLevanto", "dileATuAmiga","laPregunta","encantadora"],
  electronica: ["panamericano", "sweetDisposition","redLights","infinity"],
  radio: ["borderline","soloUnMomento","onTopOfTheWorld","musicaDoBrasil","firstWorldProblems","shineOn","whenTheSunComesDown"],
  favoritos: [],
  
};

//localStorage.setItem('objetoPlaylist', JSON.stringify(list))
let playlists = JSON.parse(localStorage.getItem('objetoPlaylist')) || list;

function cambiarImagen() {  

setTimeout(function() {    
    foto.src = 'imagenes/imagen1.png'
    setTimeout(function() {
       foto.src = 'imagenes/imagen4.png';
       setTimeout(function() {
          foto.src = 'imagenes/imagen2.png';
           setTimeout(function() {
          foto.src = 'imagenes/imagen3.png';
          setTimeout(function() {
           cambiarImagen();
        }, 8000);
     }, 8000);
   }, 8000);
  }, 8000);
}, 8000);

}




cambiarImagen()





function mostrarLista(genero) {

  

  lista.innerHTML = ''; 
  const canciones = playlists[genero]; 
  
  if(canciones.length === 0){
    lista.innerHTML = '<p>No se encontraron canciones para este género.</p>';}
  if (genero === 'favoritos' && canciones.length === 0){
    lista.innerHTML = '<p>No se encontraron canciones guardadas en favoritos..</p>';}
  if (canciones) {
    // Si existen canciones para el género seleccionado
    canciones.forEach((cancion, index) => {
      
      
      
      const contenedor2 = document.createElement('div')
      const titulo = document.createElement('h2')  
      const imgBoton = document.createElement('img')
      const span2 = document.createElement('p')
      imgBoton.src = 'imagenes/mas.png'
      imgBoton.style.height= '35px'
      imgBoton.style.width= '35px'
      imgBoton.style.cursor = 'pointer'
      imgBoton.className = 'botonFavorito'
      titulo.style.cursor = 'pointer'
      titulo.style.color= "#2b4e32"
      titulo.style.fontSize= '30px'
      titulo.style.marginBottom = '5px'
      const nombreArchivo = canciones[index]
      const nombreFormateado = formatearNombreArchivo(nombreArchivo)
      titulo.textContent = nombreFormateado
      titulo.style.marginRight = '15px'
      contenedor2.className = 'divisor'
      contenedor2.appendChild(titulo)
      contenedor2.appendChild(span2)
      contenedor2.appendChild(imgBoton)
      //contenedor2.appendChild(botonFavoritos)
      titulo.addEventListener('click', () => seleccionarMusica(cancion));
      if (genero != 'favoritos') {
      imgBoton.addEventListener('click', () => guardarFavorito(genero,cancion));
      imgBoton.title = 'Agregar a favoritos'
      }
      if (genero === 'favoritos') {
      imgBoton.src = 'imagenes/borrarFavorito.png'
      imgBoton.addEventListener('click', () => eliminarFavorito(genero,cancion));
      imgBoton.title = 'Eliminar de favoritos'
      imgBoton.src = 'imagenes/menos.png'
      }
     // lista.appendChild(titulo);
      //lista.appendChild(botonFavoritos);
     lista.appendChild(contenedor2)
     
    });
  } else {
    
    
    // Si no se encuentra el género seleccionado
    lista.innerHTML = '<p>No se encontraron canciones para este género.</p>';
  }
}

// Función para seleccionar y reproducir una canción
function seleccionarMusica(cancion) {
  const nuevoAudio = document.createElement('audio')
  const rutaCancion = `canciones/${cancion}.mp3`; 
  
  nuevoAudio.src = rutaCancion;
  nuevoAudio.type= "audio/mpeg"
  nuevoAudio.setAttribute('controls', 'controls');
  nuevoAudio.style.backgroundColor = '#2b4e32';
  base.style.height= '615px'
  reproductorAudio.innerHTML = '';
  reproductorAudio.appendChild(nuevoAudio);
  nuevoAudio.play();
  
}
  


//funcion que carga aleatoriamente musica
function aleatorio() {

lista.innerHTML = ''; 
let numero = Math.trunc((Math.random() * 10))
let genero2 = ''

//se la limita a 5 porque son los generos que hay
while (numero > 4) {
numero = Math.trunc((Math.random() * 10))

}
if (numero===0) { genero2 = 'rock' }
if (numero===1) { genero2 = 'cumbia' }
if (numero===2) { genero2 = 'regeton' }
if (numero===3) { genero2 = 'electronica' } 
if (numero===4) { genero2 = 'radio' }


let idCanciones = Math.trunc((Math.random() * 10))
mostrarLista(genero2) 

while (idCanciones >= playlists[genero2].length) {
idCanciones = Math.trunc((Math.random() * 10))
}
const canciones2 = playlists[genero2]
let cancion2 = canciones2[idCanciones]
seleccionarMusica(canciones2[idCanciones])
}

function guardarFavorito (genero, cancion) {
let arreglo = playlists.favoritos
if (check(arreglo, cancion) === false) {
playlists.favoritos.push(cancion) 
localStorage.setItem('objetoPlaylist', JSON.stringify(playlists))
let objUsable = JSON.parse(localStorage.getItem('objetoPlaylist'))
}
}

function eliminarFavorito (genero, cancion) {

playlists.favoritos = playlists.favoritos.filter(item => item != cancion) 
mostrarLista(genero)
localStorage.setItem('objetoPlaylist', JSON.stringify(playlists))
let objUsable = JSON.parse(localStorage.getItem('objetoPlaylist'))

}

function check(array, element) {
	return array.includes(element)
}






function formatearNombreArchivo(nombreArchivo) {
  const palabras = nombreArchivo.split(/(?=[A-Z])/);
  
  const nombreFormateado = palabras.map(word => {
      const primeraLetra = word.charAt(0).toUpperCase();
      const restoPalabra = word.slice(1).toLowerCase();
      return primeraLetra + restoPalabra;
  }).join(" ");
  
    return nombreFormateado;
  }
