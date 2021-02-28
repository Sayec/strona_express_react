function galleryRoutes(app, path, db) {
  const Photos = require('../models/photo');
  const Categories = require('../models/category');
  const Objects = require('../models/object');
  app.get('/api/getGallery', (req, res) => {
    const list = ['item1', 'item2', 'item3', 'dsadsa', 'tedasasdsasasadast123'];
    console.log(list);
    console.log('Sent list of items');
    // Photos.find().distinct('category', (err, data) => {
    //   console.log(data);
    //   res.json(data);
    // });
    Categories.find({}, (err, data) => {
      console.log(data);
      res.json(data);
    });
    // console.log(list1);
  });
  app.get('/api/getObjects', (req, res) => {
    const { category, object } = req.query;
    Objects.find({ category }, (err, data) => {
      console.log(data);
      res.json(data);
    });
  });
  app.get('/api/getGalleryObject', (req, res) => {
    // const list = ['item1', 'item2', 'item3', 'dsadsa', 'tedasasdsasasadast123'];
    // console.log(list);
    // console.log('Sent list of items');
    // const list = ['item1', 'item2', 'item3', 'dsadsa', 'tedasasdsasasadast123'];
    // console.log(list);
    // console.log('Sent list of items');
    // Photos.find({}, (err, data) => {
    //   console.log(data);
    //   res.json(data);
    // });
    const { category, object } = req.query;
    console.log('tutja cos mam' + req.query.object);
    Photos.find({ category, object }, (err, data) => {
      console.log(data);
      res.json(data);
    });
    // console.log(list1);
  });
}
module.exports = galleryRoutes;
