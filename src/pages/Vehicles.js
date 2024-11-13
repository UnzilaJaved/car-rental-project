import React from 'react';
import './featuredvehicles.css';

const FeaturedVehicles = () => {
  const vehicles = [
    {
      name: 'Dacia Dokker',
      year: 2016,
      image: '/IMAGES/carhome.jpg',
    },
    {
      name: 'Dacia Duster',
      year: 2021,
      image: '/IMAGES/feauturedvehicles.jpeg',
    },
    {
      name: 'Renault Clio',
      year: 2019,
      image: '/IMAGES/feauturedvehicles2.jpeg',
    },
  ];

  return (
    <div className="featured-container">
      <h2 className="featured-heading">Featured Vehicles</h2>
      <p className="featured-subheading">Explore our top vehicles trusted by clients worldwide.</p>
      <div className="featured-grid">
        {vehicles.map((vehicle, index) => (
          <div key={index} className="featured-card">
            <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
            <div className="text-container">
              <p className="vehicle-name">{vehicle.name}</p>
              <p className="vehicle-year">{vehicle.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedVehicles;





