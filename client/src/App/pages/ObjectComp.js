import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ObjectComp = () => {
  const [values, setValues] = useState({
    fName: '',
    sName: '',
    url: '',
  });
  const [objectElements, setObjectElements] = useState([]);
  const [isAddActive, setIsAddActive] = useState(false);
  let { category, object } = useParams();
  useEffect(() => getGalleryObject(), []);
  const getGalleryObject = () => {
    fetch(
      '/api/getGalleryObject?' +
        new URLSearchParams({
          category,
          object,
        })
    )
      .then((res) => {
        console.log(res);
        console.log('here');
        console.log(JSON.stringify(res));
        return res.json();
      })
      .then((objectElements) => {
        console.log('HEJ' + objectElements);
        setObjectElements([...objectElements]);
      });
    //   .then((res) => {
    //     console.log(res);
    //     return res.json();
    //   })
    //   .then((objectElements) => {
    //     console.log(objectElements[3].category);
    //     // gallery.length;
    //     setObjectElements([...objectElements]);
    //   });
  };
  const allCategoryElements = objectElements.map((element) => {
    const url = element.url;
    const urlSplitted = url.split('\\');
    console.log(urlSplitted);
    return (
      <div key={element._id}>
        {element.title} {element.url}
        <img
          src={
            require(`../../../src/uploads/${urlSplitted[10]}/${urlSplitted[11]}/${urlSplitted[12]}`)
              .default
          }
          alt=""
        />
        <form method="POST" action="/testdelete">
          <button>Usun</button>
        </form>
      </div>
    );
  });

  const addButtonOnClick = () => {
    console.log('zmiana');
    setIsAddActive(!isAddActive);
  };
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
  // console.log(gallery[0].url);
  return (
    <div>
      {allCategoryElements}
      {/* <img src={require('../../uploads/5/a_rozjechane.jpg').default} alt="" /> */}
      {/* <Link to={'/gallery/m42'}>M42</Link> */}
      <Link to={'./'}>
        <button variant="raised">Home</button>
      </Link>
      {/* <Link to={`/upload/${category}/${object}`}>Dodaj zdjęcie</Link> */}
      <button onClick={addButtonOnClick}>Dodaj zdjęcie</button>
      {isAddActive ? (
        <form
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
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="object" value={object} />
          <button class="form-field" type="submit" onClick={getGalleryObject}>
            Register
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default ObjectComp;
