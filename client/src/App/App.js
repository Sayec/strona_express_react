import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/app.scss';
import Home from './pages/Home';
import List from './pages/List';
import Default from './pages/Default';
import Id from './pages/Id';

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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list" component={List} />

        <Route path="/:category" component={Id} />
        <Route path="/" component={Default} />
      </Switch>
    </div>
  );
};

export default App;
