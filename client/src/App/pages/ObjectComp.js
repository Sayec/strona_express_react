import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Element from './Element';

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
        return res.json();
      })
      .then((objectElements) => {
        console.log('HEJ' + objectElements);
        setObjectElements([...objectElements]);
      });
  };
  const allCategoryElements = objectElements.map((element) => {
    const { _id, url, title } = element;
    const urlSplitted = url.split('\\');

    return (
      <Element
        _id={_id}
        title={title}
        url={url}
        refreshGallery={getGalleryObject}
      />
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
  };
  const handleSNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      sName: e.target.value,
    }));
  };
  const handleUrlChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      url: e.target.value,
    }));
  };
  return (
    <div>
      {allCategoryElements}

      <Link to={'.'}>
        <button variant="raised">Home</button>
      </Link>
      <button onClick={addButtonOnClick}>Dodaj zdjęcie</button>
      {isAddActive ? (
        <form
          method="post"
          enctype="multipart/form-data"
          action="/upload"
          // onSubmit={handleSubmit}
        >
          {' '}
          <label for="fname">Nazwa:</label> <br />
          <input type="text" name="fname" onChange={handleFNameChange} /> <br />
          <label for="lname">Opis:</label>
          <br />
          <input type="text" name="lname" onChange={handleSNameChange} />
          <br />
          <input type="file" name="file" onChange={handleUrlChange} />
          <br />
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="object" value={object} />
          <button class="form-field" type="submit" onClick={getGalleryObject}>
            Dodaj
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default ObjectComp;
