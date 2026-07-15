// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

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

// Reference sa sensors
const sensorRef = ref(db, "ehrms/sensors");

// Basahin ang data nang real-time
onValue(sensorRef, (snapshot) => {

    const data = snapshot.val();

    console.log(data);

});
