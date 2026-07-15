// Firebase SDK

import { initializeApp }

from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {

getDatabase,

ref,

set,

update,

onValue

}

from

"https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

const firebaseConfig = {

apiKey: "AIzaSyANeNIeM-PTlPu2UHWv1k2AKbJgQMNa3-g",

authDomain: "iot-projects-8b62e.firebaseapp.com",

databaseURL: "https://iot-projects-8b62e-default-rtdb.firebaseio.com",

projectId: "iot-projects-8b62e",

storageBucket: "iot-projects-8b62e.firebasestorage.app",

messagingSenderId: "280788228140",

appId: "1:280788228140:web:ba021c0028b037ae995989"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

console.log("Firebase Connected");
