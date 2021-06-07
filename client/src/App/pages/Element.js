import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Element = ({ _id, title, url, refreshGallery }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const deleteElement = (id, url, category, object) => {
    console.log(id);
    fetch('/deleteElement', {
      method: 'POST',
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
  useEffect(() => {
    let modal = document.getElementsByClassName('modal-container')[0];
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
      if (event.target == modal) {
        console.log('xD');
        setModalVisible(!modalVisible);
        // modal.style.display = 'none';
      }
    };
  }, []);

  function handleClick(e) {
    e.preventDefault();
    console.log(e.target);
    setModalVisible(true);
  }
  const urlSplitted = url.split('\\');
  return (
    <div>
      <div className="elementContainer">
        <button>{_id}</button>
        <button>{title}</button>
        <button>{url}</button>
        <span>{modalVisible ? 'tak' : 'nie'}</span>
        <img
          src={require(`../../../${url}`).default}
          alt=""
          onClick={handleClick}
        />
        <button
          onClick={() =>
            deleteElement(_id, url, urlSplitted[10], urlSplitted[11])
          }
        >
          Usuń
        </button>
      </div>
      <div
        className={
          modalVisible ? 'modal-container modal-visible' : 'modal-container'
        }
      >
        <div className="modal-content">
          <img src={require(`../../../${url}`).default} alt="" />
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Element;
