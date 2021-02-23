import React, { useEffect, useState } from 'react';
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
const Nav = () => {
  const [values, setValues] = useState({
    fName: '',
    sName: '',
    url: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/l')
      .then((res) => res.json())
      .then((resa) => console.log(resa));
  }, []);

  const handleFNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      fName: e.target.value,
    }));
    console.log(values.fName);
  };
  const handleSNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      sName: e.target.value,
    }));
    console.log(values.sName);
  };
  const handleUrlChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      url: e.target.value,
    }));
    console.log(values.url);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.fName);
    console.log(values.sName);
    console.log(values.url);
    setSubmitted(true);
  };

  return (
    <div className="App">
      <h1>Project Nav</h1>
      {/* Link to List.js */}
      <nav>
        <Link to={'./list'}>My List</Link>
        <Link to={'./eq'}>E Q</Link>
        <Link to={'./gallery'}>Galeria</Link>
        <Link to={'./about'}>O mnie</Link>
        <Link to={'./admin'}>Logowanie</Link>
        <Link to={'./gallery/5'}>5</Link>
        <Link className="test">Test</Link>
      </nav>
      {/* <form
        method="post"
        enctype="multipart/form-data"
        action="/upload"
        // onSubmit={handleSubmit}
      >
        {' '}
        <label for="fname">First name:</label> <br />
        <input type="text" name="fname" onChange={handleFNameChange} /> <br />
        <label for="lname">Last name:</label>
        <br />
        <input type="text" name="lname" onChange={handleSNameChange} />
        <br />
        <input type="file" name="file" onChange={handleUrlChange} />
        <br />
        <button class="form-field" type="submit">
          Register
        </button>
      </form>
      {submitted && (
        <div class="success-message">Success! Thank you for registering</div>
      )} */}
    </div>
  );
};
export default Nav;
