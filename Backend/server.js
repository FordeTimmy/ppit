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

// Serve images route
app.get('/images/:imageName', async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imageRef = firebaseAdmin.storage().bucket().file(`images/${imageName}`);
    
    // Get the download URL of the image
    const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '03-27-2024' }); // Adjust expiry date accordingly

    // Redirect to the image URL
    res.redirect(url);
  } catch (error) {
    console.error("Error serving image:", error);
    res.status(404).json({ message: 'Image not found' });
  }
});

// Route to handle user registration
app.post('/register', async (req, res) => {
  // User registration logic
});

// Route to handle user login
app.post('/login', async (req, res) => {
  // User login logic
});

console.log("FIREBASE_SERVICE_ACCOUNT_KEY_PATH:", process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
