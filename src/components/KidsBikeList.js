import React from 'react';
import { Link } from 'react-router-dom';
import kidsBikesData from './kidsBikesData'; // Import your kids bikes data

const KidsBikeList = () => {
  return (
    <div>
      <h1>Kids Bikes</h1>
      <ul>
        {kidsBikesData.map(bike => (
          <li key={bike.id}>
            <Link to={`/Kidsbikes/${bike.id}`}>{bike.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KidsBikeList;
