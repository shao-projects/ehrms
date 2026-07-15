// Firebase SDK - STABLE VERSION
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyANeNIeM-PTlPu2UHWv1k2AKbJgQMNa3-g",
  authDomain: "iot-projects-8b62e.firebaseapp.com",
  databaseURL: "https://iot-projects-8b62e-default-rtdb.firebaseio.com",
  projectId: "iot-projects-8b62e",
  storageBucket: "iot-projects-8b62e.firebasestorage.app",
  messagingSenderId: "280788228140",
  appId: "1:280788228140:web:ba021c0028b037ae995989"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log("Firebase Connected");

// ===============================
// REFERENCES - HIWALAY LAHAT
// ===============================
const sensorRef = ref(db, "ehrms/sensors");
const statusRef = ref(db, "ehrms/status");
const controlRef = ref(db, "ehrms/control");

// ===============================
// 1. SENSOR LISTENER
// ===============================
onValue(sensorRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
        console.log("No sensor data yet");
        return;
    }
    console.log("Sensor Data:", data);

    // Lagyan mo ng fallback para hindi mag error kung null
    document.getElementById("ph").textContent = data.ph ?? "--";
    document.getElementById("tds").textContent = (data.tds ?? "--") + " ppm";
    document.getElementById("turbidity").textContent = (data.turbidity ?? "--") + " NTU";
    document.getElementById("voltage").textContent = (data.voltage ?? "--") + " V";
    document.getElementById("current").textContent = (data.current ?? "--") + " A";
    document.getElementById("power").textContent = (data.power ?? "--") + " W";
}); // <-- DITO KA KULANG KANINA

// ===============================
// 2. DEVICE STATUS LISTENER
// ===============================
onValue(statusRef, (snapshot) => {
    const status = snapshot.val();
    if (!status) return;

    const deviceStatus = document.getElementById("deviceStatus");
    const statusDot = document.getElementById("statusDot");
    if (!deviceStatus || !statusDot) return;

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
// 3. CONTROL BUTTONS - LABAS SA LISTENER
// ===============================
document.getElementById("startBtn")?.addEventListener("click", () => {
    update(controlRef, {
        start: true,
        stop: false,
        release: false,
        drain: false,
        emergency: false
    });
    console.log("START COMMAND SENT");
});

document.getElementById("stopBtn")?.addEventListener("click", () => {
    update(controlRef, {
        start: false,
        stop: true,
        release: false,
        drain: false,
        emergency: false
    });
    console.log("STOP COMMAND SENT");
});

document.getElementById("releaseBtn")?.addEventListener("click", () => {
    update(controlRef, { release: true });
    console.log("RELEASE COMMAND SENT");
});

document.getElementById("drainBtn")?.addEventListener("click", () => {
    update(controlRef, { drain: true });
    console.log("DRAIN COMMAND SENT");
});
