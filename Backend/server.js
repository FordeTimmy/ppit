const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const firebaseAdmin = require('firebase-admin');

// Firebase Admin SDK configuration
const serviceAccount = require('C:\\Users\\timmy\\OneDrive\\Desktop\\PPIT_PROJ\\ppit\\serviceAccountKey.json');



firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
});

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
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
