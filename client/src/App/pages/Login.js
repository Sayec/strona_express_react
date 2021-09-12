import React, { useState, useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const [isDataSend, setIsDataSend] = useState(false);

  useEffect(() => {
    getCookies();
  }, [isDataSend]);

  const handleUserNameChange = (e) => {
    e.persist();
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    e.persist();
    setPassword(e.target.value);
  };
  const getCookies = () => {
    fetch('/getcookie')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAdmin(data.admin);
      });
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
  };
  return (
    <div>
      <form onSubmit={sendData}>
        <label for="username">Username:</label>{' '}
        <input type="text" onChange={handleUserNameChange} /> <br />
        <label for="password">Password:</label>{' '}
        <input
          type="password"
          //   name="password"
          onChange={handlePasswordChange}
        />{' '}
        <br />
        <button type="submit" value="Submit">
          Login
        </button>
      </form>
      {admin ? 'Zalogowano jako admin' : 'Niezalogowany użytkownik'}
    </div>
  );
};

export default Login;
