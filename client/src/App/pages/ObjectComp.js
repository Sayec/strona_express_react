import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ObjectComp = () => {
  const [objectElements, setObjectElements] = useState([]);
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

export default ObjectComp;
