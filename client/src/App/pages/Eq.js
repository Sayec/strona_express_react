import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Eq = () => {
  return (
    <div>
      O eq coś
      <Link to={'./'}>
        <button variant="raised">Home</button>
      </Link>
    </div>
  );
};

export default Eq;
