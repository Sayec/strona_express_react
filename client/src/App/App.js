import React from 'react';
import './styles/app.scss';
import Page from './pages/Page';
import Nav from './pages/Nav';

const App = () => {
  return (
    <div>
      {<Nav />}
      {<Page />}
    </div>
  );
};

export default App;
