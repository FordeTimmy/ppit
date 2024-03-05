const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const firebaseAdmin = require('firebase-admin');
require('dotenv').config(); // Load environment variables from .env file

// Firebase Admin SDK configuration
try {
  const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://ppit-31389.firebaseio.com"
  });
} catch (error) {
  console.error("Error loading Firebase service account:", error);
  process.exit(1); // Exit the process if unable to initialize Firebase
}

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle user registration
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Firebase Admin SDK code for user registration
    // Example: firebaseAdmin.auth().createUser({...});
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ message: error.message });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Firebase Admin SDK code for user login
    // Example: firebaseAdmin.auth().signInWithEmailAndPassword(email, password);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(400).json({ message: error.message });
  }
});

console.log("FIREBASE_SERVICE_ACCOUNT_KEY_PATH:", process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
