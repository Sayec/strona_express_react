import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Element from './Element';

const ObjectComp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [values, setValues] = useState({
    fName: '',
    sName: '',
    url: '',
  });
  const [searchName, setSearchName] = useState('');
  const [objectElements, setObjectElements] = useState([]);
  const [isAddActive, setIsAddActive] = useState(false);
  let { category, object } = useParams();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    getGalleryObject();
    getCookies();
  }, [window.location.pathname]);
  const getCookies = () => {
    fetch('/getcookie')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAdmin(data.admin);
      });
  };
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
        setObjectElements([...objectElements]);
      });
  };
  let modal = document.querySelector('.modal-container');
  let modalData = document.getElementsByClassName('modal-content')[0];
  let elementList = () => {
    switch (searchName) {
      case '':
        return objectElements.map((element) => {
          console.log('tutak' + element.title);
          const { _id, url, title, description } = element;
          return (
            <Element
              admin={admin}
              _id={_id}
              title={title}
              description={description}
              url={url}
              refreshGallery={getGalleryObject}
              modalData={modalData}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          );
        });
      default:
        return objectElements
          .filter((element) => {
            const { title } = element;
            return title.toLowerCase().includes(searchName.toLowerCase());
          })
          .map((element) => {
            // const { _id, url, title } = element;
            const { title, description, url } = element;
            return (
              <Element
                // _id={_id}
                admin={admin}
                title={title}
                description={description}
                url={url}
                refreshGallery={getGalleryObject}
                modalData={modalData}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            );
          });
    }
  };
  window.onclick = function (event) {
    if (event.target === modal) {
      setModalVisible((modalVisible) => !modalVisible);
    }
  };

  const addButtonOnClick = () => {
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
  const handleSearch = (e) => {
    e.persist();
    setSearchName(e.target.value);
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

      <div className="elements-container">
        {elementList()}

        <div className="break-line"></div>
        <div className="break-line"></div>
      </div>
      <div
        className={
          modalVisible ? 'modal-container modal-visible' : 'modal-container'
        }
      >
        <div className="modal-content">
          <img alt="" />
          <h3></h3>
          <p></p>
        </div>
      </div>
      <Link to={'.'}>
        <button variant="raised">Wróć</button>
      </Link>
      {admin ? <button onClick={addButtonOnClick}>Dodaj zdjęcie</button> : null}
      {isAddActive ? (
        <form method="post" enctype="multipart/form-data" action="/upload">
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
