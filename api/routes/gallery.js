function galleryRoutes(app, path, db) {
  const Photos = require('../models/photo');
  const Categories = require('../models/category');
  const Objects = require('../models/object');

  app.get('/api/getGallery', (req, res) => {
    const list = ['item1', 'item2', 'item3', 'dsadsa', 'tedasasdsasasadast123'];
    console.log(list);
    console.log('Sent list of items');
    Categories.find({}, (err, data) => {
      console.log(data);
      res.json(data);
    });
  });
  app.get('/api/getObjects', (req, res) => {
    console.log('HAHAHAHAHAHAHA');
    console.log(req.query);
    const { category, object } = req.query;
    Objects.find({ category }, (err, data) => {
      console.log(data);
      res.json(data);
    });
  });
  app.get('/api/getGalleryObject', (req, res) => {
    const { category, object } = req.query;
    console.log('tutja cos mam' + req.query.object);
    Photos.find({ category, object }, (err, data) => {
      console.log(data);
      res.json(data);
    });
  });
  let time = 0;
  let newTime = 0;
  setInterval(() => {
    if (newTime) {
      time = ++time % Math.ceil(newTime);
    } else {
      time = ++time % 1;
    }
  }, 1000);

  app.get('/api/getTime', (req, res) => {
    res.json(time);
  });
  app.post('/api/sendTime', function (req, res) {
    console.log(req.body);
    newTime = req.body.durationTime;
    console.log('wyslana wartosc' + newTime.durationTime);
    res.status(201).json({ some: 'response' });
  });
}
module.exports = galleryRoutes;
