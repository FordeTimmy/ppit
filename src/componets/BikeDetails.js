// BikeDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import bikesData from './bikesData'; // Adjust the path as necessary

const BikeDetails = () => {
  let { id } = useParams();
  const bike = bikesData.find(bike => bike.id === parseInt(id));

  return (
    <div>
      {bike ? (
        <div>
          <h2>{bike.name}</h2>
          <img src={bike.image} alt={bike.name} />
          <p>{bike.description}</p>
          <p>{bike.price}</p>
        </div>
      ) : (
        <p>Bike not found</p>
      )}
    </div>
  );
}

export default BikeDetails;
