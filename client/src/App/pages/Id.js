import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Id = () => {
  const [values, setValues] = useState({
    fName: '',
    sName: '',
    url: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      fName: e.target.value,
    }));
    console.log(values.fName);
  };
  const handleSNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      sName: e.target.value,
    }));
    console.log(values.sName);
  };
  const handleUrlChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      url: e.target.value,
    }));
    console.log(values.url);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.fName);
    console.log(values.sName);
    console.log(values.url);
    setSubmitted(true);
  };
  let { category, object } = useParams();
  console.log(object);
  return (
    <div>
      {' '}
      <form
        method="post"
        enctype="multipart/form-data"
        action="/upload"
        // onSubmit={handleSubmit}
      >
        {' '}
        <label for="fname">First name:</label> <br />
        <input type="text" name="fname" onChange={handleFNameChange} /> <br />
        <label for="lname">Last name:</label>
        <br />
        <input type="text" name="lname" onChange={handleSNameChange} />
        <br />
        <input type="file" name="file" onChange={handleUrlChange} />
        <br />
        <input type="hidden" name="category" value={category} />
        <input type="hidden" name="object" value={object} />
        <button class="form-field" type="submit">
          Register
        </button>
      </form>
      {submitted && (
        <div class="success-message">Success! Thank you for registering</div>
      )}
    </div>
  );
};
export default Id;
