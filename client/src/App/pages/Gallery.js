import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [values, setValues] = useState({
    categoryName: '',
  });
  useEffect(() => getGallery(), []);
  const getGallery = () => {
    fetch('/api/getGallery')
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((gallery) => {
        // console.log(gallery[3].category);
        // gallery.length;
        setGallery([...gallery]);
        console.log(gallery[0].name);
      });
  };
  const categoryLinks = gallery.map((category) => {
    return <div>{category.url}</div>;
  });
  console.log(categoryLinks);

  const handleCategoryNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      categoryName: e.target.value,
    }));
    console.log(values.categoryName);
  };
  return (
    <div>
      Galeria
      {/* <img src={require('../../uploads/a_rozjechane.jpg').default} alt="" /> */}
      {gallery.length > 0
        ? gallery.map((category) => (
            <Link to={`/gallery/${category.name}`}>{category.name}</Link>
          ))
        : // <Link to={`/gallery/${gallery[3].category}`}>
          //   {gallery[3].category}
          // </Link>
          null}
      <form
        method="post"
        // enctype="multipart/form-data"
        action="/addCategory"
      >
        <label for="categoryname">Category Name:</label> <br />
        <input
          type="text"
          name="categoryname"
          onChange={handleCategoryNameChange}
        />
        <br />
        <button class="form-field" type="submit">
          Register
        </button>
      </form>
      <Link to={'./'}>
        <button variant="raised">Home</button>
      </Link>
    </div>
  );
};

// tutaj tylko unikalne kategorie a w kolejnych pagach wrzucam w propsach kategorie i uzywam funkcji getGalleryCategory z tego pliku dla poszczegolnej kategorii

export default Gallery;
