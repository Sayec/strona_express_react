import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-container">
      <p className="text-about">
        Sprzęt{' '}
        <ul>
          <li>Teleskop Skywatcher 150/750</li>
          <li>Lustrzanka Canon 1100D</li>
          <li>Statyw EQ3-2 ze stalowym statywem</li>
        </ul>{' '}
      </p>
      <Link to={'./'}>
        <button variant="raised">Wróć</button>
      </Link>
    </div>
  );
};

export default About;
