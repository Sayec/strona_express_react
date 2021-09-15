import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const [admin, setAdmin] = useState(false);
  const [categoryElements, setCategoryElements] = useState([]);
  const [values, setValues] = useState({
    objectName: '',
  });
  const [objects, setObjects] = useState([]);
  let { category } = useParams();
  useEffect(() => {
    getObjects();
    getCookies();
  }, []);
  const getObjects = () => {
    axios
      .get('/api/getObjects?' + new URLSearchParams({ category }))
      .then((res) => {
        // console.log(res.data);
        setObjects([...res.data]);
        // return res.json();
      });
  };
  const getCookies = () => {
    fetch('/getcookie')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAdmin(data.admin);
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
  const [searchName, setSearchName] = useState('');
  const urlSplitted = window.location.pathname.split('/');
  const allCategoryElements = objects.map((object) => (
    <div className="categoryElement">
      <Link to={`${window.location.pathname}` + `${object.name}`}>
        <div className="insideCategory">
          <div className="blockDiv"></div>
          <span>{object.name}</span>
        </div>
      </Link>
      {admin ? (
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
      ) : null}
    </div>
  ));
  const handleSearch = (e) => {
    e.persist();
    setSearchName(e.target.value);
  };
  let elementList = () => {
    switch (searchName) {
      case '':
        return objects.map((element) => {
          return (
            <div className="categoryElement">
              <Link to={`${window.location.pathname}` + `${element.name}`}>
                <div className="insideCategory">
                  <div className="blockDiv"></div>
                  <span>{element.name}</span>
                </div>
              </Link>
              {admin ? (
                <button
                  onClick={() =>
                    deleteObjectInCategory(
                      window.location.pathname.split('/')[2],
                      element.name
                    )
                  }
                >
                  Usuń
                </button>
              ) : null}
            </div>
          );
        });
      default:
        return objects
          .filter((element) => {
            const { name } = element;
            return name.toLowerCase().includes(searchName.toLowerCase());
          })
          .map((element) => {
            // const { _id, url, title } = element;
            return (
              <div className="categoryElement">
                <Link to={`${window.location.pathname}` + `${element.name}`}>
                  <div className="insideCategory">
                    <div className="blockDiv"></div>
                    <span>{element.name}</span>
                  </div>
                </Link>
                {admin ? (
                  <button
                    onClick={() =>
                      deleteObjectInCategory(
                        window.location.pathname.split('/')[2],
                        element.name
                      )
                    }
                  >
                    Usuń
                  </button>
                ) : null}
              </div>
            );
          });
    }
  };
  return (
    <div>
      <div className="searchForm">
        <input
          type="text"
          placeholder="Wyszukaj..."
          value={searchName}
          onChange={handleSearch}
        />
      </div>
      <div className="categoryStyles">
        {/* {objects.length > 0 ? allCategoryElements : null} */}
        {elementList()}
      </div>
      <div>
        {admin ? (
          <form method="post" action="/addObject">
            <input
              type="hidden"
              name="categoryname"
              value={urlSplitted[urlSplitted.length - 2]}
            />
            <label for="objectname">Object Name:</label> <br />
            <input
              type="text"
              name="objectname"
              onChange={handleObjectNameChange}
            />
            <br />
            <button class="form-field" type="submit">
              Dodaj obiekt
            </button>
          </form>
        ) : null}
        <Link to={'../'}>
          <button variant="raised">Wróć</button>
        </Link>
      </div>
    </div>
  );
};

export default Category;
