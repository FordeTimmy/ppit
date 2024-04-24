const admin = require('firebase-admin');
require('dotenv').config();     

// Initialize Firebase Admin with credentials
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH); // Replace with the path to your Firebase service account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ppit-31389.firebaseio.com" // Replace with your database URL
});

// Function to set custom claims
const setAdminClaim = (uid) => {
  admin.auth().setCustomUserClaims(uid, { admin: true })
    .then(() => {
      console.log(`Custom claims set for user ${uid}, now an admin.`);
    })
    .catch(error => {
      console.error('Error setting custom claims:', error);
    });
};

// Replace 'user-uid' with the actual UID of the user you want to make an admin
setAdminClaim('383YoBYXupchkpQsGEcfG6SRYU13');
