import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import List from './List';
import Default from './Default';
import Id from './Id';
import Category from './Category';
import Eq from './Eq';
import Gallery from './Gallery';
import About from './About';

const Page = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list" component={List} />
        <Route path="/about" component={About} />
        <Route exact path="/gallery" component={Gallery} />
        <Route path="/eq" component={Eq} />
        <Route path="/upload/:category" component={Id} />

        <Route path="/gallery/:category" component={Category} />
        <Route path="/" component={Default} />
      </Switch>
    </div>
  );
};

export default Page;
