import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// class Home extends Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>Project Home</h1>
//         {/* Link to List.js */}
//         <Link to={'./list'}>
//           <button variant="raised">My List</button>
//         </Link>
//       </div>
//     );
//   }
// }
const Home = () => {
  useEffect(() => {
    fetch('/l')
      .then((res) => res.json())
      .then((resa) => console.log(resa));
  }, []);
  return (
    <div className="App">
      <h1>Project Home</h1>
      {/* Link to List.js */}
      <Link to={'./list'}>
        <button variant="raised">My List</button>
      </Link>
      <Link to={'./admin'}>
        <button variant="raised">Logowanie</button>
      </Link>
    </div>
  );
};
export default Home;
