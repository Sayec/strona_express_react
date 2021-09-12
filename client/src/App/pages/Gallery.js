import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
// import video from '../../uploads/siostry_botEZ_o_Bartoshu.mp4';

const Gallery = () => {
  const [isTimeCounting, setIsTimeCounting] = useState(true);

  const [gallery, setGallery] = useState([]);
  const [values, setValues] = useState({
    categoryName: '',
  });
  const [videoTime, setVideoTime] = useState(0);
  const [isGalleryHidden, setIsGalleryHidden] = useState(true);
  const videoRef = useRef();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    getCount();
    // console.log(isTimeCounting);
    getGallery();
    getCookies();
    // console.log(!isTimeCounting);

    // videoRef.current.addEventListener('loadedmetadata', () => {
    // if (!isTimeCounting) {
    //   console.log('halo');
    //   sendTime();
    // }
    // getTime();
    // });

    setIsGalleryHidden(false);
    // videoRef.current.currentTime = videoTime;
    // videoRef.current.play();
    // }, [videoTime, videoRef.current, isTimeCounting]);
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
  // const getTime = () => {
  //   fetch('/api/getTime')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((timeData) => {
  //       setVideoTime(timeData);
  //     });
  // };

  // const sendTime = () => {
  //   fetch('/api/sendTime', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     // Accept: 'application/json',
  //     // responseType: 'json',
  // body: JSON.stringify({ durationTime: `${videoRef.current.duration}` }),
  //   })
  //     .then((result) => {
  //       return result;
  //     })
  //     .then((info) => {});
  // };
  const getCount = () => {
    fetch('/api/getCount')
      .then((res) => {
        return res.json();
      })
      .then((isCounting) => {
        // console.log(isCounting);
        setIsTimeCounting(isCounting);
      });
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
