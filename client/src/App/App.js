import React, { useEffect, useState } from 'react';
import './styles/app.scss';
import Page from './pages/Page';
import Nav from './pages/Nav';
import Newest from './pages/Newest';
const App = () => {
  const [newest, setNewest] = useState([]);
  useEffect(() => {
    getNewestPhotos();
  }, []);
  const getNewestPhotos = () => {
    fetch('/api/getNewestPhotos/5')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNewest(...newest, data);
      });
  };
  if (!newest.length) return null;
  return (
    <div>
      {<Nav />}

      {<Page />}
      {<Newest newest={newest} />}
    </div>
  );
};

export default App;
