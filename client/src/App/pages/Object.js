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
  return (
    <div>
      {allCategoryElements}
      <Link to={'./'}>
        <button variant="raised">Home</button>
      </Link>
      <Link to={`/upload/${category}/${object}`}>Dodaj zdjęcie</Link>
    </div>
  );
};

export default Object;
