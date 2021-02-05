import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App">
      <h1>Nie ma tkaiej strony</h1>
      {/* Link to List.js */}
      <Link to={'./'}>
        <button variant="raised">Home</button>
      </Link>
    </div>
  );
};
export default Home;
