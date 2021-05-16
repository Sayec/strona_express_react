import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import video from '../../uploads/Mateusz Socha -.mp4';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [values, setValues] = useState({
    categoryName: '',
  });
  const [videoTime, setVideoTime] = useState(0);
  const [isGalleryHidden, setIsGalleryHidden] = useState(true);
  const videoRef = useRef();
  const [isAdmin, setIsAdmin] = useState(true);
  useEffect(() => {
    getGallery();
    if (videoRef.current.duration) {
      sendTime();
      getTime();
    } else {
      getTime();
    }

    setIsGalleryHidden(false);

    videoRef.current.currentTime = videoTime;
    videoRef.current.play();
  }, [videoTime, videoRef.current]);
  const getGallery = () => {
    fetch('/api/getGallery')
      .then((res) => {
        return res.json();
      })
      .then((gallery) => {
        setGallery([...gallery]);
      });
  };
  const getTime = () => {
    fetch('/api/getTime')
      .then((res) => {
        return res.json();
      })
      .then((timeData) => {
        setVideoTime(timeData);
      });
  };
  const sendTime = () => {
    fetch('/api/sendTime', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      // Accept: 'application/json',
      // responseType: 'json',
      body: JSON.stringify({ durationTime: `${videoRef.current.duration}` }),
    })
      .then((result) => {
        return result;
      })
      .then((info) => {});
  };

  const categoryLinks = gallery.map((category) => {
    return <div>{category.url}</div>;
  });

  const handleCategoryNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      categoryName: e.target.value,
    }));
  };
  return (
    <div className={isGalleryHidden ? 'galleryStyles hidden' : 'galleryStyles'}>
      <video
        src={video}
        width="320"
        height="240"
        controls={isAdmin}
        autoPlay
        muted
        ref={videoRef}
        loop
        // src="/client/src/uploads/siostry_botEZ_o_Bartoshu.mp4"
      ></video>
      {/* <img
        src={
          require('../../../src/uploads/galaktyki/m42/a_rozjechane.jpg').default
        }
        alt=""
      /> */}
      Galeria
      {/* <img src={require('../../uploads/a_rozjechane.jpg').default} alt="" /> */}
      {gallery.length > 0
        ? gallery.map((category) => (
            <Link to={`/gallery/${category.name}`}>{category.name}</Link>
          ))
        : // <Link to={`/gallery/${gallery[3].category}`}>
          //   {gallery[3].category}
          // </Link>
          null}
      <form
        method="post"
        // enctype="multipart/form-data"
        action="/addCategory"
      >
        <label for="categoryname">Category Name:</label> <br />
        <input
          type="text"
          name="categoryname"
          onChange={handleCategoryNameChange}
        />
        <br />
        <button class="form-field" type="submit">
          Register
        </button>
      </form>
      <Link to={'./'}>
        <button variant="raised">Home</button>
      </Link>
    </div>
  );
};

// tutaj tylko unikalne kategorie a w kolejnych pagach wrzucam w propsach kategorie i uzywam funkcji getGalleryCategory z tego pliku dla poszczegolnej kategorii

export default Gallery;
