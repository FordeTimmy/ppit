// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA___FVj3wIMwaleNEpyg8TC80WxXFJbdg",
  authDomain: "ppit-31389.firebaseapp.com",
  projectId: "ppit-31389",
  storageBucket: "ppit-31389.appspot.com",
  messagingSenderId: "390467488364",
  appId: "1:390467488364:web:1a2c8cbcdb932922ffe649",
  measurementId: "G-KEH41H5GP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);