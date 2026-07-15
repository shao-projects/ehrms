// ================================
// EHRMS Dashboard Script
// Version 1.0
// ================================

// Demo Sensor Values
let ph = 7.00;
let tds = 420;
let turbidity = 15;
let voltage = 4.80;
let current = 0.20;

let treatmentRunning = false;
let progress = 0;

//====================
// Update Sensor Cards
//====================

function updateDashboard(){

    document.getElementById("ph").innerHTML = ph.toFixed(2);

    document.getElementById("tds").innerHTML = tds + " ppm";

    document.getElementById("turbidity").innerHTML = turbidity + " NTU";

    document.getElementById("voltage").innerHTML = voltage.toFixed(2) + " V";

    document.getElementById("current").innerHTML = current.toFixed(2) + " A";

    let power = voltage * current;

    document.getElementById("power").innerHTML = power.toFixed(2) + " W";

}

//====================
// Progress Animation
//====================

setInterval(function(){

    if(treatmentRunning){

        if(progress < 100){

            progress++;

        }

        document.getElementById("progressBar").style.width = progress + "%";

    }

},500);


//====================
// START Button
//====================

document.getElementById("startBtn").onclick=function(){

    treatmentRunning=true;

    document.getElementById("treatmentStatus").innerHTML="RUNNING";

    document.getElementById("electro").innerHTML="ON";

    addLog("Treatment Started");

}

//====================
// STOP Button
//====================

document.getElementById("stopBtn").onclick=function(){

    treatmentRunning=false;

    document.getElementById("treatmentStatus").innerHTML="STOPPED";

    document.getElementById("electro").innerHTML="OFF";

    addLog("Treatment Stopped");

}

//====================
// RELEASE WATER
//====================

document.getElementById("releaseBtn").onclick=function(){

    document.getElementById("valve").innerHTML="OPEN";

    document.getElementById("turbine").innerHTML="RUNNING";

    addLog("Water Released");

}

//====================
// DRAIN
//====================

document.getElementById("drainBtn").onclick=function(){

    addLog("Sludge Drain Activated");

}

//====================
// EMERGENCY
//====================

document.getElementById("emergencyBtn").onclick=function(){

    treatmentRunning=false;

    progress=0;

    document.getElementById("progressBar").style.width="0%";

    document.getElementById("treatmentStatus").innerHTML="EMERGENCY STOP";

    document.getElementById("electro").innerHTML="OFF";

    document.getElementById("valve").innerHTML="CLOSED";

    document.getElementById("turbine").innerHTML="OFF";

    addLog("!!! EMERGENCY STOP !!!");

}

//====================
// LOG BOX
//====================

function addLog(text){

    let box=document.getElementById("logBox");

    let time=new Date().toLocaleTimeString();

    box.innerHTML=time+" - "+text+"<br>"+box.innerHTML;

}

//====================
// Demo Sensor Changes
//====================

setInterval(function(){

    if(treatmentRunning){

        ph += (Math.random()-0.5)*0.02;

        tds -= Math.random()*2;

        turbidity -= Math.random()*0.2;

        voltage += (Math.random()-0.5)*0.05;

        current += (Math.random()-0.5)*0.01;

        if(turbidity<1)turbidity=1;

        if(tds<100)tds=100;

        updateDashboard();

    }

},1000);


// Initial Display

updateDashboard();
