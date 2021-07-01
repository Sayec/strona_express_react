import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Element = ({
  _id,
  title,
  url,
  refreshGallery,
  modalData,
  modalVisible,
  setModalVisible,
}) => {
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

  function handleClick(e) {
    e.preventDefault();
    console.log(e.target);
    setModalVisible(true);
    const myImgPath = require(`../../../${url}`).default;

    modalData.children[0].src = myImgPath;
    modalData.children[1].innerHTML = `${title}`;
    console.log(modalData.children[0].src);
  }
  const urlSplitted = url.split('\\');
  return (
    <div>
      <div className="elementContainer">
        <button>{title}</button>

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
    </div>
  );
};

export default Element;
