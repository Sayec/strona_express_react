function galleryRoutes(app, path, db) {
  const Photos = require('../models/photo');
  app.get('/api/getGallery', (req, res) => {
    const list = ['item1', 'item2', 'item3', 'dsadsa', 'tedasasdsasasadast123'];
    console.log(list);
    console.log('Sent list of items');
    Photos.find().distinct('category', (err, data) => {
      console.log(data);
      res.json(data);
    });

    // console.log(list1);
  });
  app.get('/api/getGalleryCategory', (req, res) => {
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
    const { category } = req.query;
    console.log('tutja cos mam' + category);
    Photos.find({ category }, (err, data) => {
      console.log(data);
      res.json(data);
    });
    // console.log(list1);
  });
}
module.exports = galleryRoutes;
