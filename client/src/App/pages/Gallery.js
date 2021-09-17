import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
// import video from '../../uploads/siostry_botEZ_o_Bartoshu.mp4';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [values, setValues] = useState({
    categoryName: '',
  });
  const [isGalleryHidden, setIsGalleryHidden] = useState(true);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    getGallery();
    getCookies();
    setIsGalleryHidden(false);
  }, []);
  const getCookies = () => {
    fetch('/getcookie')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAdmin(data.admin);
      });
  };
  const getGallery = () => {
    fetch('/api/getGallery')
      .then((res) => {
        return res.json();
      })
      .then((gallery) => {
        setGallery([...gallery]);
      });
  };

  const handleCategoryNameChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      categoryName: e.target.value,
    }));
  };

  return (
    <div>
      <div
        className={isGalleryHidden ? 'galleryStyles hidden' : 'galleryStyles'}
      >
        {gallery.length > 0
          ? gallery.map((category) => (
              <Link to={`/gallery/${category.name}/`}>
                <div className="insideGall">
                  <div className="blockDiv"></div>
                  <span>{category.name}</span>
                </div>
              </Link>
            ))
          : null}
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
