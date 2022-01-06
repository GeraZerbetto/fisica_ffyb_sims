var analizador = document.getElementById("analizador");
var outputAnaliz = document.getElementById("analizadorValue");

var polarizador = document.getElementById("polarizador");
var outputPola = document.getElementById("polarizadorValue");




outputAnaliz.innerHTML = analizador.value/10;
outputPola.innerHTML = polarizador.value/10;


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//ctx.fillStyle = "black";
//ctx.fillRect(0, 0, canvas.width, canvas.height);

var x = 250;
var y = 250;


function initPola(){
    outputAnaliz.innerHTML = analizador.value/10;
    outputPola.innerHTML = polarizador.value/10;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    alpha = calculateAlpha(analizador, polarizador)
    makeCircle(x,y,alpha.izq, Math.PI/2, 3*Math.PI/2,ctx);
    makeCircle(x,y,alpha.der, 3*Math.PI/2, Math.PI/2,ctx);    
}

analizador.oninput = function() {
  outputAnaliz.innerHTML = this.value/10;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  alpha = calculateAlpha(analizador, polarizador)
  makeCircle(x,y,alpha.izq, Math.PI/2, 3*Math.PI/2,ctx);
  makeCircle(x,y,alpha.der, 3*Math.PI/2, Math.PI/2,ctx);
}

polarizador.oninput = function() {
    outputPola.innerHTML = this.value/10;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    alpha = calculateAlpha(analizador, polarizador)
    makeCircle(x,y,alpha.izq, Math.PI/2, 3*Math.PI/2,ctx);
    makeCircle(x,y,alpha.der, 3*Math.PI/2, Math.PI/2,ctx);
  }

function makeCircle(x, y, alpha, start, end, canvas) {
    canvas.beginPath();
    //canvas.globalAlpha = alpha
    string = `rgba(255,255,255,${alpha})`
    canvas.arc(x, y, 200, start, end);
    canvas.fillStyle = string;
    canvas.fill();
}

function calculateAlpha(analizador, polarizador){
    analiz_deg = analizador.value/10;
    pola_deg = polarizador.value/10;
    retard_deg = -pola_deg;

    deg_net_angle = pola_deg - analiz_deg;
    deg_retard_angle = retard_deg - analiz_deg;

    rad_angle = degrees_to_radians(deg_net_angle);
    retard_rad = degrees_to_radians(deg_retard_angle);
    izq = Math.cos(rad_angle)**2
    der = Math.cos(retard_rad)**2
    return {
        izq,
        der
    }
}

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi/180);
}