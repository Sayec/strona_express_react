import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Element = ({ _id, title, url }) => {
  const urlSplitted = url.split('\\');
  return (
    <div>
      <button>{_id}</button>
      <button>{title}</button>
      <button>{url}</button>
      <img
        src={
          require(`../../../src/uploads/${urlSplitted[10]}/${urlSplitted[11]}/${urlSplitted[12]}`)
            .default
        }
        alt=""
      />
    </div>
  );
};

export default Element;
