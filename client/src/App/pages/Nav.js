import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="App">
      <h1>Project Nav</h1>
      <nav>
        <Link to={'/eq'}>E Q</Link>
        <Link to={'/gallery'}>Galeria</Link>
        <Link to={'/about'}>O mnie</Link>
        <Link to={'/admin'}>Logowanie</Link>
        {/* <Link to={'/gallery/5'}>5</Link> */}
        <Link className="test">Test</Link>
      </nav>
    </div>
  );
};
export default Nav;
