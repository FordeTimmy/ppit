// Footer.js
import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="footer-about">
            <h6>About Us</h6>
            <p className="text-justify">Roberts & Forde Cycles is a family-run business dedicated to providing quality bicycles and accessories for all ages and skill levels. We believe in the power of cycling to create a healthier, more connected world.</p>
          </div>

          <div className="footer-links">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li> 
              <li><a href="/contact">Contact Us</a></li> 
              <li><a href="/privacy">Privacy Policy</a></li>  
              <li><a href="/sitemap">Sitemap</a></li> 
            </ul>
          </div>

          <div className="footer-social">
            <h6>Our Socials</h6>
            <ul className="footer-social-icons">
              <li><a href="https://www.facebook.com/yourfacebookpage"><i className="fab fa-facebook"></i> Facebook</a></li>
              <li><a href="https://twitter.com/yourtwitterhandle"><i className="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="https://www.instagram.com/atu_ie/?hl=en"><i className="fab fa-instagram"></i> Instagram</a></li>  // Your actual Instagram link
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p>Roberts & Forde Cycles © 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
