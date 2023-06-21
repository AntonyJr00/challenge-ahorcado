const palabras = [
  "javascript",
  "typescript",
  "java",
  "node",
  "python",
  "bicentenario",
  "beca",
];

//---
let palabraDelJuego;
let fallos = 0;
let aciertos = 0;

const jugar = document.getElementById("jugar"); //boton obtener palabra
jugar.addEventListener("click", iniciar);

const imagen = document.getElementById("imagen");

const alfabeto = document.querySelectorAll(".item");
//agrega el evento buttonClick a todos los botones del alfaabeto
for (let i = 0; i < alfabeto.length; i++) {
  alfabeto[i].addEventListener("click", buttonClick);
}

//fucion a llamar cuando se le da clikc al boton obtener palabra
function iniciar() {
  imagen.src = "img/img0.png";
  jugar.disabled = true;
  fallos = 0;
  aciertos = 0;
  document.getElementById("resultado").innerHTML = ""; // resetea el resultado---

  const parrafo = document.getElementById("play-word");
  parrafo.innerHTML = "";

  const numPalabras = palabras.length;
  const numeroRandom = obtenerNumRandom(numPalabras);

  palabraDelJuego = palabras[numeroRandom]; //indice de la palabra en el arreglo de palabras---
  const numDeLetras = palabraDelJuego.length;
  console.log(palabraDelJuego);

  alfabeto.forEach((botones) => {
    botones.disabled = false;
  });

  //crea los spans de la palabra del juego  dependiendo del length de la palabra al azar----
  for (let i = 0; i < numDeLetras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }
}
//funcion que retorna un numero al azar----
function obtenerNumRandom(num_max) {
  const numeroRandom = Math.floor(Math.random() * num_max);
  return numeroRandom;
}
//funcion a llamar cuando se hace click en cualquier boton del abecedario----
function buttonClick(event) {
  console.log(event);
  const spans = document.querySelectorAll("#play-word span");
  const button = event.target; //cuál de todas las letras, llamó a la funcion----
  button.disabled = true;

  const letra = button.innerHTML;
  const palabra = palabraDelJuego.toUpperCase();

  let acerto = false;
  for (let i = 0; i < palabra.length; i++) {
    if (letra == palabra[i]) {
      //la variable i es la posicion de la letra en la palabra-------
      //que coincide con el span al que tenemos que mostarle esta letra-----
      spans[i].innerHTML = letra;
      aciertos++;
      acerto = true;
    }
  }

  if (acerto == false) {
    fallos++;
    const cambioImagen = `img/img${fallos}.png`;
    imagen.src = cambioImagen;
  }

  if (fallos == 7) {
    document.getElementById("resultado").innerHTML =
      "Perdiste, la palabra era: " + palabraDelJuego.toUpperCase();
    finalizacion();
  } else if (aciertos == palabraDelJuego.length) {
    document.getElementById("resultado").innerHTML = "FELICIDADES GANASTE! :)";
    finalizacion();
  }
}
//funcion a llamar cuando el juego termine
function finalizacion() {
  alfabeto.forEach((botones) => {
    botones.disabled = true;
  });
  jugar.disabled = false;
}
finalizacion();

//fin! ,alfin--------
