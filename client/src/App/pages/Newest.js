import { Link } from 'react-router-dom';

const Newest = ({ newest }) => {
  return (
    <div className="newest">
      <h2>Najnowsze zdjęcia</h2>
      <div className="newest-photo-container">
        {newest.map((element) => {
          return (
            <div className="newest-element">
              <Link
                to={`/gallery/${element.category}/${element.object}`}
                replace
              >
                <img src={`/images/${element.url}`} alt="" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Newest;
