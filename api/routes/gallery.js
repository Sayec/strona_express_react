function galleryRoutes(app, path, db) {
  const Photos = require('../models/photo');
  const Categories = require('../models/category');
  const Objects = require('../models/object');

  app.get('/api/getGallery', (req, res) => {
    Categories.find({}, (err, data) => {
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
      res.json(data);
    });
  });
  let time = 0;
  let newTime = 0;
  let countTime = false;
  setInterval(() => {
    if (countTime) {
      if (newTime) {
        time = ++time % Math.ceil(newTime);
      } else {
        time = ++time;
      }
    }
  }, 1000);

  app.get('/api/getTime', (req, res) => {
    // console.log(countTime);
    res.json(time);
  });
  app.get('/api/getCount', (req, res) => {
    res.json(countTime);
  });
  app.post('/api/sendTime', function (req, res) {
    countTime = true;
    newTime = req.body.durationTime;
    console.log('wyslana wartosc' + newTime.durationTime);
    res.status(201).json({ some: 'response' });
  });
}
module.exports = galleryRoutes;
