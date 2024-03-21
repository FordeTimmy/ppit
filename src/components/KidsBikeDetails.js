import React from 'react';
import { useParams } from 'react-router-dom';
import kidsBikesData from './kidsBikesData'; // Import your kids bikes data

const KidsBikeDetails = () => {
  let { id } = useParams();
  const bike = kidsBikesData.find(bike => bike.id === parseInt(id));

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

export default KidsBikeDetails;
