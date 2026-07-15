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


// ===============================
// START BUTTON
// ===============================

document.getElementById("startBtn").addEventListener("click", () => {

    update(controlRef, {

        start: true,
        stop: false,
        release: false,
        drain: false,
        emergency: false

    });

    console.log("START COMMAND SENT");

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
