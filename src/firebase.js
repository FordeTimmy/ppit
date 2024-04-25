// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
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

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Auth and provider for Google sign-in
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


