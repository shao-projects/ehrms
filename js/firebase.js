// ===============================
// Firebase SDK
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue,
    update
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


// ===============================
// Firebase Config
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyANeNIeM-PTlPu2UHWv1k2AKbJgQMNa3-g",
    authDomain: "iot-projects-8b62e.firebaseapp.com",
    databaseURL: "https://iot-projects-8b62e-default-rtdb.firebaseio.com",
    projectId: "iot-projects-8b62e",
    storageBucket: "iot-projects-8b62e.firebasestorage.app",
    messagingSenderId: "280788228140",
    appId: "1:280788228140:web:ba021c0028b037ae995989"
};


// ===============================
// Initialize Firebase
// ===============================
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log("Firebase Connected");


// ===============================
// SIMULATION MODE
// ===============================
const SIMULATION_MODE = true;


// ===============================
// SENSOR MONITORING
// ===============================
const sensorRef = ref(db, "ehrms/sensors");
onValue(sensorRef, (snapshot) => {

    const data = snapshot.val();
    if (!data) return;

    console.group("📡 SENSORS");
    console.table(data);
    console.groupEnd();


    document.getElementById("ph").textContent = data.ph;
    document.getElementById("tds").textContent = data.tds + " ppm";
    document.getElementById("turbidity").textContent = data.turbidity + " NTU";
    document.getElementById("voltage").textContent = data.voltage + " V";
    document.getElementById("current").textContent = data.current + " A";
    document.getElementById("power").textContent = data.power + " W";

});


// ===============================
// DEVICE STATUS
// ===============================

const statusRef = ref(db, "ehrms/status");
onValue(statusRef, (snapshot) => {
const status = snapshot.val();

    if (!status) return;

    const deviceStatus = document.getElementById("deviceStatus");
    const statusDot = document.getElementById("statusDot");

    if (status.online) {

        deviceStatus.textContent = "DEVICE ONLINE";
        statusDot.style.background = "#00ff66";
        statusDot.style.animation = "none";

    } else {

        deviceStatus.textContent = "DEVICE NOT CONNECTED";
        statusDot.style.background = "red";
        statusDot.style.animation = "blink 1s infinite";
    }

});


// ===============================
// CONTROL REFERENCE
// ===============================

const controlRef = ref(db, "ehrms/control");
const settingsRef = ref(db,"ehrms/settings");

// ===============================
// SEND COMMAND
// ===============================

function sendCommand(command){

    update(controlRef,{

        start: false,
        stop: false,
        release: false,
        drain: false,
        emergency: false,

        [command]: true

    })
    .then(() => {

        console.log(command.toUpperCase() + " COMMAND SENT");

    })
    .catch((error) => {

        console.error("COMMAND ERROR:", error);

    });
}

// ===============================
// BUTTON EVENTS
// ===============================

// START
document.getElementById("startBtn").addEventListener("click", () => {
    sendCommand("start");

    if (SIMULATION_MODE) {
        startSimulation();
    }
});

// STOP
document.getElementById("stopBtn").addEventListener("click", () => {
    sendCommand("stop");
});

// RELEASE WATER
document.getElementById("releaseBtn").addEventListener("click", () => {
    sendCommand("release");
});

// DRAIN SLUDGE
document.getElementById("drainBtn").addEventListener("click", () => {
    sendCommand("drain");
});

// EMERGENCY STOP
document.getElementById("emergencyBtn").addEventListener("click", () => {
    sendCommand("emergency");
});


// ===============================
// OUTPUT STATUS
// ===============================
const outputRef = ref(db, "ehrms/outputs");
onValue(outputRef, (snapshot) => {
    const out = snapshot.val();
    if (!out) return;

    console.group("⚙ OUTPUTS");
    console.table(out);
    console.groupEnd();

    document.getElementById("startBtn").classList.toggle("active", out.start);
    document.getElementById("stopBtn").classList.toggle("active", out.stop);
    document.getElementById("releaseBtn").classList.toggle("active", out.release);
    document.getElementById("drainBtn").classList.toggle("active", out.drain);
    document.getElementById("emergencyBtn").classList.toggle("active", out.emergency);

});


// ===============================
// TREATMENT STATUS
// ===============================

const processRef = ref(db, "ehrms/process");

onValue(processRef, (snapshot)=>{
    const process = snapshot.val();
    if(!process) return;

    document.getElementById("treatmentStatus").textContent = process.state;
    document.getElementById("progressBar").style.width = process.progress + "%";
    document.getElementById("progressText").textContent = process.progress + "%";

});

// ===============================
// SYSTEM LOGS
// ===============================

const logRef = ref(db,"ehrms/logs");
onValue(logRef,(snapshot)=>{
    const log=snapshot.val();
    if(!log) return;
    
    document.getElementById("logBox").innerHTML=
    log.last;
});

// ===============================
// SYSTEM SETTINGS
// ===============================

onValue(settingsRef,(snapshot)=>{

    const settings=snapshot.val();

    if(!settings) return;

    document.getElementById("treatmentTime").value=
    settings.treatment_time;

});


// ===============================
// START SIMULATION
// ===============================
async function startSimulation(){
    await update(ref(db,"ehrms/process"),{
        state:"INITIALIZING...",
        progress:5

    });

    await update(ref(db,"ehrms/logs"),{
    last:"System Initializing..."

    });

    console.log("Simulation Started");
}

document.getElementById("saveSettingsBtn").addEventListener("click",()=>{
const minutes=parseInt(document.getElementById("treatmentTime").value);
    update(settingsRef,{
    treatment_time:minutes
    });
    console.log("Treatment Time Saved:",minutes);

});
