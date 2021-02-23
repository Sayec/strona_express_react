import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/app.scss';
import Home from './pages/Home';
import List from './pages/List';
import Default from './pages/Default';
import Id from './pages/Id';
import Category from './pages/Category';
import Eq from './pages/Eq';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Page from './pages/Page';
import Nav from './pages/Nav';
// class App extends Component {
//   render() {
//     const App = () => (
//       <div>
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route path="/list" component={List} />
//         </Switch>
//       </div>
//     );
//     return (
//       <Switch>
//         <App />
//       </Switch>
//     );
//   }
// }

const App = () => {
  return (
    <div>
      <nav>{<Nav />}</nav>
      <div>{<Page />}</div>
    </div>
    // <div>
    //   <Switch>
    //     <Route exact path="/" component={Home} />
    //     <Route path="/list" component={List} />
    //     <Route path="/about" component={About} />
    //     <Route exact path="/gallery" component={Gallery} />
    //     <Route path="/eq" component={Eq} />
    //     <Route path="/upload/:category" component={Id} />

    //     <Route path="/gallery/:category" component={Category} />
    //     <Route path="/" component={Default} />
    //   </Switch>
    // </div>
  );
};

export default App;
