import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

const Gallery = () => {
  const [values, setValues] = useState({
    categoryName: '',
  });
  const [photos, setPhotos] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isGalleryHidden, setIsGalleryHidden] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [urlPhoto, setUrlPhoto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    let objectsUrls;
    const photos = await getAllPhotos();
    const gallery = await getGallery();
    console.log(gallery);
    console.log(photos);
    setPhotos([...photos]);
    setGallery([...gallery]);
    console.log('GALLERY');
    console.log(urlPhoto);
    getCookies();
    setIsGalleryHidden(false);

    if (Object.keys(urlPhoto).length) console.log('działa');
    if (!Object.keys(urlPhoto).length) {
      objectsUrls = getRandomPhoto(photos, gallery);
      setUrlPhoto(objectsUrls);
    }
    console.log(urlPhoto);
    setIsLoading(false);
  }, []);

  const getGallery = async () => {
    const response = await fetch('/api/getGallery');
    const data = await response.json();
    return data;
    // await fetch('/api/getGallery')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((gallery) => {
    //     setGallery([...gallery]);
    //     // return gallery;
    //   });
  };
  const getAllPhotos = async () => {
    const response = await fetch('/api/getAllPhotos');
    const data = await response.json();
    return data;
    // await fetch('/api/getAllPhotos')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((photos) => {
    //     setPhotos([...photos]);
    //     // return photos;
    //   });
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
  const handleCategoryNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      categoryName: e.target.value,
    }));
  };
  const getRandomPhoto = (photos, gallery) => {
    console.log(gallery);
    console.log(photos);
    let urlObject = {};
    gallery.forEach((category) => {
      console.log(category.name);
      let newArray = photos.filter(
        (element) => element.category === category.name
      );
      console.log(newArray.length ? newArray[newArray.length - 1] : 'brak');
      let url = newArray.length ? newArray[newArray.length - 1].url : '';
      urlObject[category.name] = url;
      console.log(urlObject);
    });
    return urlObject;
  };

  return (
    <div>
      <div
        className={isGalleryHidden ? 'galleryStyles hidden' : 'galleryStyles'}
      >
        {!isLoading
          ? gallery.map((category) => (
              <Link to={`/gallery/${category.name}/`}>
                <div className="insideGall">
                  <img
                    src={`/images/${urlPhoto[category.name]}`}
                    className="blockDiv"
                  ></img>
                  <span>{category.name}</span>
                </div>
              </Link>
            ))
          : 'Loading...'}
      </div>
      <div>
        {admin ? (
          <form method="post" action="/addCategory">
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
        ) : null}
        <Link to={'../'}>
          <button variant="raised">Wróć</button>
        </Link>
      </div>
    </div>
  );
};

export default Gallery;
