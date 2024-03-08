// Home.js

import React from 'react';
import Navbar from './navbar';
import Card from './card';
import './styles.css';
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="card-container">
        <Card title="Placeholder Title 1" content="This is some placeholder content for card 1." />
        <Card title="Placeholder Title 2" content="This is some placeholder content for card 2." />
        {/* Add more cards here */}
      </div>
    </div>
  );
}

export default Home;
