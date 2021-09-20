import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDataSend, setIsDataSend] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    getCookies();
  }, [isDataSend, admin]);
  const getCookies = () => {
    console.log('cookie');
    fetch('/getcookie')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAdmin(data.admin);
      });
  };

  window.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    if (
      e.target.closest('[data-dropdown]') !== null &&
      e.target.id !== 'login'
    ) {
      return;
    }
    if (e.target.id === 'login') {
      setIsActive((isActive) => !isActive);
    }
    if (e.target.closest('[data-dropdown]') === null) {
      setIsActive(false);
    }
  });
  const handleUserNameChange = (e) => {
    e.persist();
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    e.persist();
    setPassword(e.target.value);
  };
  const sendData = async (event) => {
    event.preventDefault();
    const response = await fetch('/loginValidate', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    console.log(response);
    console.log(isDataSend);
    setIsDataSend(true);
    window.location.reload();
  };
  return (
    <div className="nav-container">
      <nav className="nav">
        <Link to={'/gallery'}>Galeria</Link>
        <Link to={'/about'}>O mnie</Link>
        <div className="dropdown" data-dropdown>
          <button id="login">Login</button>{' '}
          <div className={isActive ? 'dropdown-menu active' : 'dropdown-menu'}>
            <form onSubmit={sendData}>
              <label for="username">Username:</label>{' '}
              <input type="text" onChange={handleUserNameChange} /> <br />
              <label for="password">Password:</label>{' '}
              <input type="password" onChange={handlePasswordChange} /> <br />
              <button type="submit" value="Submit">
                Login
              </button>
            </form>
          </div>{' '}
        </div>
      </nav>
    </div>
  );
};
export default Nav;
