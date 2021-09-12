import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav-container">
      {/* <a className="hideMenu" onClick={handleHideMenu}>
        <i class="fas fa-chevron-circle-right"></i>
      </a> */}
      <nav className="nav">
        {/* <Link to={'/eq'}>E Q</Link> */}
        <Link to={'/gallery'}>Galeria</Link>
        <Link to={'/about'}>O mnie</Link>
        <Link to={'/login'}>Logowanie</Link>
      </nav>
    </div>
  );
};
export default Nav;
