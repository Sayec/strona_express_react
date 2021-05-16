import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Category = () => {
  const [categoryElements, setCategoryElements] = useState([]);
  const [values, setValues] = useState({
    objectName: '',
  });
  const [objects, setObjects] = useState([]);
  let { category } = useParams();
  useEffect(() => getObjects(), []);
  const getObjects = () => {
    fetch(
      '/api/getObjects?' +
        new URLSearchParams({
          category,
        })
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((objects) => {
        // console.log(gallery[3].category);
        // gallery.length;
        setObjects([...objects]);
        console.log(objects[0].name);
      });
  };
  // useEffect(() => getGalleryCategory(), []);
  // const getGalleryCategory = () => {
  //   fetch(
  //     '/api/getGalleryCategory?' +
  //       new URLSearchParams({
  //         category,
  //         object,
  //       })
  //   )
  //     .then((res) => {
  //       console.log(res);
  //       console.log(JSON.stringify(res));
  //       return res.json();
  //     })
  //     .then((categoryElements) => {
  //       console.log('HEJ' + categoryElements);
  //       setCategoryElements([...categoryElements]);
  //     });
  // .then((res) => {
  //   console.log(res);
  //   return res.json();
  // })
  // .then((categoryElements) => {
  //   console.log(categoryElements[3].category);
  //   // gallery.length;
  //   setCategoryElements([...categoryElements]);
  // });
  // };
  const handleObjectNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      objectName: e.target.value,
    }));
  };
  const urlSplitted = window.location.pathname.split('/');
  console.log(urlSplitted[urlSplitted.length - 1]);
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
      {window.location.pathname}
      {objects.length > 0
        ? objects.map((object) => (
            <Link to={`${window.location.pathname}/${object.name}`}>
              {object.name}
            </Link>
          ))
        : null}
      <div>
        <form method="post" action="/addObject">
          <input
            type="hidden"
            name="categoryname"
            value={urlSplitted[urlSplitted.length - 1]}
          />
          <label for="objectname">Object Name:</label> <br />
          <input
            type="text"
            name="objectname"
            onChange={handleObjectNameChange}
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
    </div>
  );
};

export default Category;
