import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Object = () => {
  const [categoryElements, setCategoryElements] = useState([]);
  let { category, object } = useParams();
  useEffect(() => getGalleryCategory(), []);
  const getGalleryCategory = () => {
    fetch(
      '/api/getGalleryCategory?' +
        new URLSearchParams({
          category,
          object,
        })
    )
      .then((res) => {
        console.log(res);
        console.log(JSON.stringify(res));
        return res.json();
      })
      .then((categoryElements) => {
        console.log('HEJ' + categoryElements);
        setCategoryElements([...categoryElements]);
      });
    // .then((res) => {
    //   console.log(res);
    //   return res.json();
    // })
    // .then((categoryElements) => {
    //   console.log(categoryElements[3].category);
    //   // gallery.length;
    //   setCategoryElements([...categoryElements]);
    // });
  };
  const allCategoryElements = categoryElements.map((element) => {
    const url = element.url;
    const urlSplitted = url.split('\\');
    console.log(urlSplitted);
    return (
      <div key={element._id}>
        {element.title} {element.url}
        <img
          src={
            require(`../../${urlSplitted[9]}/${urlSplitted[10]}/${urlSplitted[11]}`)
              .default
          }
          alt=""
        />
      </div>
    );
  });
  // console.log(gallery[0].url);
  return (
    <div>
      {allCategoryElements}
      {/* <img src={require('../../uploads/5/a_rozjechane.jpg').default} alt="" /> */}
      {/* <Link to={'/gallery/m42'}>M42</Link> */}
      <Link to={'./'}>
        <button variant="raised">Home</button>
      </Link>
      <Link to={`/upload/${category}/${object}`}>Dodaj zdjęcie</Link>
    </div>
  );
};

// tutaj tylko unikalne kategorie a w kolejnych pagach wrzucam w propsach kategorie i uzywam funkcji getGalleryCategory z tego pliku dla poszczegolnej kategorii

export default Object;
