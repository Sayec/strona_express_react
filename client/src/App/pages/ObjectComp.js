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
  let modal = document.getElementsByClassName('modal-container')[0];
  let modalData = document.getElementsByClassName('modal-content')[0];
  const allCategoryElements = objectElements.map((element) => {
    const { _id, url, title } = element;
    const urlSplitted = url.split('\\');

    return (
      <Element
        _id={_id}
        title={title}
        url={url}
        refreshGallery={getGalleryObject}
        modalData={modalData}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    );
  });
  // useEffect(() => {

  // window.addEventListener('click', (e) => {
  //   // e.preventDefault();
  //   // modal.style.marginTop = '300px';
  //   console.log(e.target);
  //   // console.log(modal);
  //   if (e.target == modal) {
  //     console.log('ds');
  //     setModalVisible(!modalVisible);
  //   }
  // });
  window.onclick = function (event) {
    console.log(event.target);
    console.log(modal);
    console.log(event.target.src);
    if (event.target == modal) {
      console.log('xD');
      setModalVisible(!modalVisible);
      // modal.style.display = 'none';
    }
  };
  // }, []);

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
      <span>{modalVisible ? 'tak' : 'nie'}</span>
      {allCategoryElements}
      <div
        className={
          modalVisible ? 'modal-container modal-visible' : 'modal-container'
        }
      >
        <div className="modal-content">
          <img alt="" />
          {/* src={require(`../../../${url}`).default} */}
          <h3></h3>
        </div>
      </div>
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
