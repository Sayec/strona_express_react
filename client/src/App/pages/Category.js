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
        return res.json();
      })
      .then((objects) => {
        setObjects([...objects]);
      });
  };

  const handleObjectNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      objectName: e.target.value,
    }));
  };

  const deleteObjectInCategory = (category, name) => {
    fetch('/deleteObjectInCategory', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ category, name }),
    })
      .then((result) => {
        return result;
      })
      .then((info) => {});
    getObjects();
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
      {objects.length > 0
        ? objects.map((object) => (
            <div>
              <Link to={`${window.location.pathname}` + `${object.name}`}>
                {object.name}
              </Link>
              <button
                onClick={() =>
                  deleteObjectInCategory(
                    window.location.pathname.split('/')[2],
                    object.name
                  )
                }
              >
                Usuń
              </button>
            </div>
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
          <button class="form-field" type="submit" onClick={getObjects}>
            Dodaj kategorie
          </button>
        </form>
        <Link to={'../'}>
          <button variant="raised">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Category;
