import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Element = ({
  admin,
  _id,
  title,
  description,
  url,
  refreshGallery,
  modalData,
  modalVisible,
  setModalVisible,
}) => {
  let { category, object } = useParams();
  const [objectElements, setObjectElements] = useState([]);
  const [isEditActive, setIsEditActive] = useState(false);
  const [values, setValues] = useState({
    fName: '',
    sName: '',
  });
  const deleteElement = (id, url, category, object) => {
    console.log(id);
    fetch('/deleteElement', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      // Accept: 'application/json',
      // responseType: 'json',
      body: JSON.stringify({ id, url, category, object }),
    })
      .then((result) => {
        return result;
      })
      .then((info) => {});
    refreshGallery();
  };
  function handleClick(e) {
    e.preventDefault();
    setModalVisible(true);
    const myImgPath = `/images/${url}`;
    modalData.children[0].src = myImgPath;
    modalData.children[1].innerHTML = `${title}`;
    modalData.children[2].innerHTML = `${description}`;
  }
  const editButtonOnClick = () => {
    setIsEditActive(!isEditActive);

    setValues((values) => ({
      ...values,
      fName: title,
      sName: description,
    }));
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
  const editElement = async (e) => {
    e.preventDefault();
    await fetch('/editElement', {
      method: 'post',
      body: JSON.stringify({
        values,
        object,
        category,
        _id,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    window.location.reload();
  };
  return (
    <div>
      <div className="elementContainer">
        <button>{title}</button>

        <img src={`/images/${url}`} alt="" onClick={handleClick} />

        {admin ? (
          <button onClick={() => deleteElement(_id, url)}>Usuń</button>
        ) : null}
        {admin ? (
          <button onClick={editButtonOnClick}>Edytuj zdjęcie</button>
        ) : null}
        {isEditActive && admin ? (
          <form method="post" enctype="multipart/form-data">
            {' '}
            <label for="fname">Nazwa:</label> <br />
            <input
              type="text"
              name="fname"
              value={values.fName}
              onChange={handleFNameChange}
            />{' '}
            <br />
            <label for="lname">Opis:</label>
            <br />
            <input
              type="text"
              name="lname"
              value={values.sName}
              onChange={handleSNameChange}
            />
            <br />
            <br />
            <input type="hidden" name="category" value={category} />
            <input type="hidden" name="object" value={object} />
            <button class="form-field" onClick={editElement}>
              Zatwierdź zmiany
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default Element;
