import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Default from './Default';
import Id from './Id';
import Category from './Category';
import Eq from './Eq';
import Gallery from './Gallery';
import About from './About';
import ObjectComp from './ObjectComp';
import Login from './Login';

const Page = () => {
  useEffect(() => {
    console.log('halo_page');
    // getCookies();
  }, []);
  // const getCookies = () => {
  //   fetch('/getcookie')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setAdmin(data.admin);
  //     });
  // };

  return (
    <div className="page-container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route exact path="/gallery" component={Gallery} />
        {/* <Route
          exact
          path="/gallery"
          render={(props) => <Gallery {...props} admin={admin} />}
        /> */}
        <Route path="/eq" component={Eq} />
        <Route path="/upload/:category/:object" component={Id} />
        <Route path="/gallery/:category/:object" component={ObjectComp} />
        {/* <Route
          path="/gallery/:category/:object"
          render={(props) => <ObjectComp {...props} admin={admin} />}
        /> */}
        {/* <Route
          path="/gallery/:category"
          render={(props) => <Category {...props} admin={admin} />}
        /> */}
        <Route path="/gallery/:category" component={Category} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Default} />
      </Switch>
    </div>
  );
};

export default Page;
