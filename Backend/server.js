const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const firebaseAdmin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

// Initialize Firebase Admin SDK
try {
  const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Middleware to verify admin access
const verifyAdmin = (req, res, next) => {
  const idToken = req.headers.authorization;
  firebaseAdmin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      if (decodedToken.admin === true) {
        req.user = decodedToken;
        next();
      } else {
        res.status(403).json({ error: 'Unauthorized access' });
      }
    })
    .catch(error => {
      console.error('Error verifying ID token:', error);
      res.status(403).json({ error: 'Unauthorized access' });
    });
};

// Serve images route
app.get('/images/:imageName', async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imageRef = firebaseAdmin.storage().bucket().file(`images/${imageName}`);
    const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '03-27-2024' });
    res.redirect(url);
  } catch (error) {
    console.error("Error serving image:", error);
    res.status(404).json({ message: 'Image not found' });
  }
});

// Route to handle order placement and send email notifications
app.post('/place-order', async (req, res) => {
  try {
    const { fullName, email, address, city, postalCode, cartItems } = req.body;

    const formattedCartItems = cartItems.map(item => `
      <div>
        <h3>${item.title}</h3>
        <img src="${item.productImageUrl}" alt="${item.title}" width="100" /><br>
        <p>Category: ${item.category}</p>
        <p>Description: ${item.description}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: €${item.price}</p>
      </div>
    `).join('');

    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation',
      html: `
        <h1>Thank you for your order, ${fullName}!</h1>
        <p>Here are the details of your purchase:</p>
        ${formattedCartItems}
        <p><strong>Total:</strong> €${totalPrice}</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${postalCode}</p>
      `
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Order placed and email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error, unable to send email' });
  }
});

// Endpoint for Stripe payment intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      metadata: { integration_check: 'accept_a_payment' },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});