//// calibracion
let AMP_MIN = 0.01;
let AMP_MAX = 0.3;

let FREC_MIN = 125;
let FREC_MAX = 270;

//////////////////////audio///////////////////////
let mic;

let amp;
let ampCruda;
let frec;

let gestorAmp;
let gestorFrec;
let audioContext;
const pichModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';


/////////////////////////////////////////////////////////////////////////
var colores;

let mancha;
let trazo = [];
let miVelocidadYDireccion;
let timer = 50;
let imagenes = []
let cantidad = 3;


function preload() {
  for (let i = 0; i <= 3; i++) {
    imagenes[i] = loadImage("data/" + i + ".png");
  }
  imagenes[4] = loadImage("data/trazo2.png");
}

function setup() {
  createCanvas(470, 600);

  colores = [color('#396ad0'), color('#065417'), color('#604c49')];

  
  miVelocidadYDireccion = new Dir_y_Vel();

  ///////////////////////setup audio//////////////////////////////
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  userStartAudio(); // forzar el inicio del audio en el navegador

  
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorFrec = new GestorSenial(FREC_MIN, FREC_MAX);
  /////////

}

let pausa = true;

function draw() {
///////////audio amplitud/////////////
    gestorAmp.actalizaGestor(mic.getLevel());// la señal directa (cruda) del mic la administra el gestor


    ampCruda = mic.getLevel();// solo para monitorear la diferencia 
    amp = gestorAmp.filtrada;
/////////////////////////////



  //if (frameCount % 600 == 0)
    //background(255);



////////////dibujado segun frecuencia
  miVelocidadYDireccion.calcularTodo(amp, frec);
  if (miVelocidadYDireccion.velocidad() >= 100 && -45 >= miVelocidadYDireccion.direccionPolar() >= -135 && frec >= 200 && timer <= 0) {
    if (pausa) {
      if (mancha != undefined) {
        mancha = undefined;
      }
      if (mancha == undefined) {
        mancha = new Mancha(imagenes);
        timer = 50;
      }
    }
    pausa = false
  } else {
    pausa = true
  }
  timer -= 1;
  if (mancha != undefined) {
    mancha.dibujar(0, 0, width, 500);
    mancha.actualizar();
  }
  if (miVelocidadYDireccion.velocidad() >= 20 && frec <= 200 && timer <= 0) {
    for (let i = 0; i < cantidad; i++) {
      if (trazo[i] == undefined) {
        trazo[i] = new Trazo(imagenes[4], color(random(255), random(255), random(255)));
        timer = 50;
        break;
      }
      if (trazo[i].checkForOutOfBounds()) {
        trazo[i] = undefined;
      }
    }
  }


  ///////////

  for (let i = 0; i < cantidad; i++) {
    if (trazo[i] != undefined) {
      trazo[i].dibujar();
      trazo[i].mover(miVelocidadYDireccion.velocidad() / 50 + 1);
    }
  }
  //console.log(trazo.checkForOutOfBounds());
  push();
  fill(255, 5)
  noStroke();
  rect(0, 0, width, height);
  pop();
}

/////////////////////audio////////////////////////
function startPitch() {
    pitch = ml5.pitchDetection(pichModel, audioContext , mic.stream, modelLoaded);
  }

function modelLoaded() {
    getPitch();
  }

  function getPitch() {
    pitch.getPitch(function(err, frequency) {
      if (frequency) {
        gestorFrec.actualizar(frequency);
        frec = gestorFrec.filtrada;
      } else {
      }
      getPitch();
    })
  }

  function imprimir(){

    push();
    
    fill(0);
    stroke(2);
    textSize(20);
    
    let texto = "amp: " + amp;
    text(texto, 20, 20)
    
    texto = "frec: " + frec;
    text(texto, 20, 40)
    
    gestorAmp.dibujar( 20, 50);
    gestorFrec.dibujar( 20, 150);
    
    let y = height - amp * height;
    ellipse(width/2 -50, y, 50, 50);
    
    y = height - ampCruda * height;
    ellipse(width/2 + 50, y, 50, 50);
    
    pop();
    }
