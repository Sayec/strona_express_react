import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    setCookies();
    // getCookies();
  }, []);
  const setCookies = () => {
    fetch('/admin')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
      });
  };
  // const getCookies = () => {
  //   fetch('/getcookie')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

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
