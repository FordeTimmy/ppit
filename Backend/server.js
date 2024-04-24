const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const firebaseAdmin = require('firebase-admin');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
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

// Middleware to verify admin access
const verifyAdmin = (req, res, next) => {
  const idToken = req.headers.authorization;
  firebaseAdmin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      if (decodedToken.admin === true) {
        req.user = decodedToken;
        next(); // User is an admin, proceed to the next middleware or route handler
      } else {
        res.status(403).json({ error: 'Unauthorized access' }); // User is not an admin
      }
    })
    .catch((error) => {
      console.error('Error verifying ID token:', error);
      res.status(403).json({ error: 'Unauthorized access' }); // Failed to verify ID token
    });
};

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

// Route to handle order placement and send email notifications
app.post('/place-order', async (req, res) => {
  try {
    console.log("Received a POST request to /place-order");
    // Extract order details from the request body
    const { fullName, email, address, city, postalCode, cartItems } = req.body;

    console.log('Order details:');
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Address:', address);
    console.log('City:', city);
    console.log('Postal Code:', postalCode);
    console.log('Cart Items:', cartItems);

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation',
      text: 'Your order has been placed successfully.'
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");

    res.status(200).json({ message: 'Order placed successfully.' });
  } catch (error) {
    console.error('Error placing order and sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin route to set admin custom claim
app.post('/admin/set-admin/:userId', verifyAdmin, (req, res) => {
  const { userId } = req.params;
  const adminStatus = req.body.admin;

  // Check if the requesting user is authorized to set admin status
  const requestingUserId = req.user.uid; // Extract requesting user UID from the verified user

  const adminUids = ['ficXlX8dtmcDJlwNhL5WzNleshC2']; // Array of authorized admin UIDs

  if (adminUids.includes(requestingUserId)) {
    firebaseAdmin.auth().setCustomUserClaims(userId, { admin: adminStatus })
      .then(() => {
        res.status(200).json({ message: 'Admin status updated successfully' });
      })
      .catch((error) => {
        console.error('Error setting custom claim:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  } else {
    res.status(403).json({ error: 'Unauthorized access' }); // User is not authorized to perform this action
  }
});



// Admin route to get all users
app.get('/admin/users', verifyAdmin, (req, res) => {
  firebaseAdmin.auth().listUsers()
    .then((users) => {
      const userList = users.users.map((userRecord) => ({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      }));
      res.status(200).json(userList);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
