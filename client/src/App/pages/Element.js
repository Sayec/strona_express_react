import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Element = ({ _id, title, url, refreshGallery }) => {
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

  const urlSplitted = url.split('\\');
  return (
    <div>
      <button>{_id}</button>
      <button>{title}</button>
      <button>{url}</button>
      <img src={require(`../../../${url}`).default} alt="" />
      <button
        onClick={() =>
          deleteElement(_id, url, urlSplitted[10], urlSplitted[11])
        }
      >
        Usuń
      </button>
    </div>
  );
};

export default Element;
