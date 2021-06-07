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
      <div className="nav-container">
        <a className="hideMenu" onClick={handleHideMenu}>
          <i class="fas fa-chevron-circle-right"></i>
        </a>
        <nav className={isHidden ? 'nav hidden' : 'nav'}>
          <Link to={'/eq'}>E Q</Link>
          <Link to={'/gallery'}>Galeria</Link>
          <Link to={'/about'}>O mnie</Link>
          <Link to={'/admin'}>Logowanie</Link>
          {/* <Link className="test">Test</Link> */}
        </nav>
      </div>
    </div>
  );
};
export default Nav;
