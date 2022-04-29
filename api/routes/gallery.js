function galleryRoutes(app, path, db) {
  const Photos = require('../models/photo');
  const Categories = require('../models/category');
  const Objects = require('../models/object');

  // Photos.find({}, (err, data) => {
  //   console.log(data);
  // });
  app.get('/api/getGallery', (req, res) => {
    Categories.find({}, (err, data) => {
      res.json(data);
    });
  });
  app.get('/api/getAllPhotos', (req, res) => {
    Photos.find({}, (err, data) => {
      res.json(data);
    });
  });
  app.get('/api/getObjects', (req, res) => {
    const { category, object } = req.query;
    Objects.find({ category }, (err, data) => {
      res.json(data);
    });
  });
  app.get('/api/getGalleryObject', (req, res) => {
    const { category, object } = req.query;
    Photos.find({ category, object }, (err, data) => {
      // console.log(data);
      res.json(data);
    });
  });
  app.get('/api/getNewestPhotos/:numberOfElements', (req, res) => {
    Photos.find()
      .sort({ date: -1 })
      .limit(parseInt(req.params.numberOfElements))
      .exec((err, data) => {
        // console.log(data);
        res.json(data);
      });
  });
}
module.exports = galleryRoutes;
