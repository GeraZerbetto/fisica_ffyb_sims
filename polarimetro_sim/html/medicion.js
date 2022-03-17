function initPola(outAn, outPol, anVal, polVal, podRot, context, canvas){
    outAn.innerHTML = anVal.value/100;
    outPol.innerHTML = polVal.value/100;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    alpha = calculateAlpha(anVal, polVal, podRot);
    makeCircle(x,y,alpha.izq, Math.PI/2, 3*Math.PI/2,ctx);
    makeCircle(x,y,alpha.der, 3*Math.PI/2, Math.PI/2,ctx);    
}

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi/180);
}

function calculateAlpha(analizador, polarizador, podRot){
    analiz_deg = analizador.value/100;
    pola_deg = polarizador.value/100;
    retard_deg = -pola_deg + podRot;

    deg_net_angle = pola_deg - analiz_deg + podRot;
    deg_retard_angle = retard_deg - analiz_deg;

    rad_angle = degrees_to_radians(deg_net_angle);
    retard_rad = degrees_to_radians(deg_retard_angle);
    izq = Math.cos(rad_angle)**2;
    der = Math.cos(retard_rad)**2;
    return {
        izq,
        der
    }
}

function makeCircle(x, y, alpha, start, end, canvas) {
    canvas.beginPath();
    string = `rgba(255,255,255,${alpha})`
    canvas.arc(x, y, 200, start, end);
    canvas.fillStyle = string;
    canvas.fill();
}

refreshField = function() {
    outputAnaliz.innerHTML = analizador.value/100;
    outputPola.innerHTML = polarizador.value/100;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    alpha = calculateAlpha(analizador, polarizador, poderRotatorio)
    makeCircle(x,y,alpha.izq, Math.PI/2, 3*Math.PI/2,ctx);
    makeCircle(x,y,alpha.der, 3*Math.PI/2, Math.PI/2,ctx);
  }

function putSample(){
    var concentracion = document.getElementById("conc").value
    //var podRotEsp = document.querySelector('input[name="muestra"]:checked').value;
    var podRotEsp = document.getElementById("muestra").value
    poderRotatorio = 2 * concentracion * podRotEsp
    initPola(outputAnaliz, outputPola, analizador, polarizador, poderRotatorio, ctx, canvas);

    console.log(poderRotatorio)
}

var analizador = document.getElementById("analizador");
var outputAnaliz = document.getElementById("analizadorValue");
var polarizador = document.getElementById("polarizador");
var outputPola = document.getElementById("polarizadorValue");
var poderRotatorio = 0.0
var actualizar = document.getElementById("submit");



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = 250;
var y = 250;


initPola(outputAnaliz, outputPola, analizador, polarizador, poderRotatorio, ctx, canvas);
analizador.oninput = refreshField;
polarizador.oninput = refreshField;