import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-container">
      <p className="text-about">
        Nazywam się Kamil Brzezowski. Astronomią interesuję się od ponad 2 lat.
        Pewnego razu podczas oglądanie nocnego nieba przez teleskop pojawiła się
        u mnie chęć uwiecznienia tego co oglądam.
        <br /> Do fotografowania nieba wykorzystuję:{' '}
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
