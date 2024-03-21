import React from 'react';
import { Link } from 'react-router-dom';
import bikesData from './bikesData';

const ElectricBikeList = () => {
  return (
    <div>
      <h1>Electric Bikes</h1>
      <ul>
        {bikesData.map(bike => (
          <li key={bike.id}>
            {/* Link to individual bike details */}
            <Link to={`/Electricbikes/${bike.id}`}>{bike.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ElectricBikeList;
