import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isHidden, setIsHidden] = useState(false);
  const handleHideMenu = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="App">
      <h1>Project Nav</h1>
      <nav className={isHidden ? 'nav hidden' : 'nav'}>
        <Link to={'/eq'}>E Q</Link>
        <Link to={'/gallery'}>Galeria</Link>
        <Link to={'/about'}>O mnie</Link>
        <Link to={'/admin'}>Logowanie</Link>
        {/* <Link to={'/gallery/5'}>5</Link> */}
        <Link className="test">Test</Link>
      </nav>
      <button className="hideMenu" onClick={handleHideMenu}>
        Hide Nav
      </button>
    </div>
  );
};
export default Nav;
