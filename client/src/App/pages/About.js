import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const About = () => {
  return (
    <div>
      O mnie coś
      <Link to={'./'}>
        <button variant="raised">Home</button>
      </Link>
    </div>
  );
};

export default About;
