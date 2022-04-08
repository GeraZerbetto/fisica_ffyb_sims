function randn_bm2(min, max, skew) {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0)
      num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    else {
      num = Math.pow(num, skew); // Skew
      num *= max - min; // Stretch to fill range
      num += min; // offset to min
    }
    return num;
  }
  
  function initPola(outAn, outPol, anVal, polVal, podRot, context, canvas) {
    outAn.innerHTML = anVal.value / 100;
    outPol.innerHTML = polVal.value / 100;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    alpha = calculateAlpha(anVal, polVal, podRot);
    makeCircle(x, y, alpha.izq, Math.PI / 2, (3 * Math.PI) / 2, ctx);
    makeCircle(x, y, alpha.der, (3 * Math.PI) / 2, Math.PI / 2, ctx);
  }
  
  function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }
  
  function calculateAlpha(analizador, polarizador, podRot) {
    analiz_deg = analizador.value / 100;
    pola_deg = polarizador.value / 100;
    retard_deg = -pola_deg + podRot;
  
    deg_net_angle = pola_deg - analiz_deg + podRot;
    deg_retard_angle = retard_deg - analiz_deg;
  
    rad_angle = degrees_to_radians(deg_net_angle);
    retard_rad = degrees_to_radians(deg_retard_angle);
    izq = Math.cos(rad_angle) ** 2;
    der = Math.cos(retard_rad) ** 2;
    return {
      izq,
      der,
    };
  }
  
  function makeCircle(x, y, alpha, start, end, canvas) {
    canvas.beginPath();
    string = `rgba(255,160,76,${alpha})`;
    canvas.arc(x, y, 200, start, end);
    canvas.fillStyle = string;
    canvas.fill();
  }
  
  refreshField = function () {
    outputAnaliz.innerHTML = analizador.value / 100;
    outputPola.innerHTML = polarizador.value / 100;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //alpha = calculateAlpha(analizador, polarizador, poderRotatorio)
    alpha = calculateAlpha(analizador, polarizador, poderRotMedido);
    makeCircle(x, y, alpha.izq, Math.PI / 2, (3 * Math.PI) / 2, ctx);
    makeCircle(x, y, alpha.der, (3 * Math.PI) / 2, Math.PI / 2, ctx);
  };
  
  function putSample() {
    var concentracion = document.getElementById("conc").value;
    var podRotEsp = document.getElementById("podRotEsp").value;
    desvEst = 3.0;
    poderRotatorio = 2 * concentracion * podRotEsp;
    poderRotMedido = randn_bm2(
      poderRotatorio - desvEst,
      poderRotatorio + desvEst,
      1
    );
    document.getElementById("analizador").value = 0.0;
    initPola(
      outputAnaliz,
      outputPola,
      analizador,
      polarizador,
      poderRotMedido,
      ctx,
      canvas
    );
    console.log(poderRotMedido);
    console.log(poderRotatorio);
    
  }
  
  var analizador = document.getElementById("analizador");
  var outputAnaliz = document.getElementById("analizadorValue");
  var polarizador = document.getElementById("polarizador");
  var outputPola = document.getElementById("polarizadorValue");
  var poderRotatorio = 0.0;
  var poderRotMedido = 0.0;
  //var actualizar = document.getElementById("submit");
  
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var x = 250;
  var y = 250;
  
  initPola(
    outputAnaliz,
    outputPola,
    analizador,
    polarizador,
    poderRotatorio,
    ctx,
    canvas
  );
  analizador.oninput = refreshField;
  polarizador.oninput = refreshField;