// const { default: Category } = require('../client/src/App/pages/Category');

// const { find } = require('./models/photo');

function handleFormPost(app, path, fs, db) {
  const Photos = require('./models/photo');
  const Categories = require('./models/category');
  const Objects = require('./models/object');
  const ObjectId = require('mongodb').ObjectID;
  const multer = require('multer');
  const util = require('util');
  const unlinkFile = util.promisify(fs.unlink);
  const upload = multer({ dest: 'uploads/' });
  const { uploadFile, getFileStream, deleteFile } = require('./s3');
  const handleError = (err, res) => {
    res
      .status(500)
      .contentType('text/plain')
      .end('Oops! Something went wrong!');
  };
  app.post('/addCategory', (req, res) => {
    console.log(req.body);
    const categoryElement = new Categories({
      name: req.body.categoryname,
      description: 'test',
    });
    categoryElement.save((err) => {
      console.log('blad' + err);
    });
    console.log(req.body);
    const targetDirectory = path.join(
      __dirname,
      `../client/src/uploads/${req.body.categoryname}`
    );
    // console.log(targetDirectory);
    // if (!fs.existsSync(targetDirectory)) {
    //   fs.mkdirSync(targetDirectory);
    // }
    res.redirect('/gallery/');
  });
  app.post('/addObject', (req, res) => {
    const objectElement = new Objects({
      name: req.body.objectname,
      category: req.body.categoryname,
      description: 'test',
    });
    objectElement.save((err) => {
      console.log('blad' + err);
    });
    // const targetDirectory = path.join(
    //   __dirname,
    //   `../client/src/uploads/${req.body.categoryname}/${req.body.objectname}`
    // );
    // console.log(targetDirectory);
    // if (!fs.existsSync(targetDirectory)) {
    //   fs.mkdirSync(targetDirectory);
    // }
    res.redirect('/gallery/' + req.body.categoryname + '/');
  });
  app.post(
    '/upload',
    upload.single('file' /* name attribute of <file> element in your form */),
    async (req, res) => {
      const file = req.file;
      console.log(file);
      const result = await uploadFile(file);
      await unlinkFile(file.path);
      if (
        path.extname(req.file.originalname).toLowerCase() === '.png' ||
        path.extname(req.file.originalname).toLowerCase() === '.jpg'
      ) {
        const photoElement = new Photos({
          title: req.body.fname,
          category: req.body.category,
          object: req.body.object,
          description: req.body.lname,
          url: result.Key,
        });
        console.log('tu jestem git');
        photoElement.save((err) => {
          console.log(err);
        });
        let categoryObject = `${req.body.category}/${req.body.object}`;
        res.redirect('/gallery/' + categoryObject);
      } else {
        fs.unlink(tempPath, (err) => {
          if (err) return handleError(err, res);
          res
            .status(403)
            .contentType('text/plain')
            .end('Only .png files are allowed!');
        });
      }
    }
  );

  app.get('/images/:key', (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  });
  app.delete('/deleteElement', (req, res) => {
    console.log(req.body.url);
    db.collection('photos').deleteOne({ _id: ObjectId(req.body.id) });
    // let categoryObject = `${req.body.category}/${req.body.object}`;
    // res.redirect('/gallery/' + categoryObject);
    deleteFile(req.body.url);
    // fs.unlink(req.body.url, function (err) {
    //   if (err) return console.log(err);
    //   console.log('usunieto element');
    // });
  });
  app.delete('/deleteObjectInCategory', (req, res) => {
    const { category, name } = req.body;
    let i;
    console.log(req.body);
    db.collection('objects').deleteOne({ category, name });
    db.collection('photos')
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        for (i = 0; i < result.length; i++) {
          fs.unlink(result[i].url, function (err) {
            if (err) return console.log(err);
            console.log('usunieto obiekt');
          });
        }
      });
    db.collection('photos').deleteMany({ category, object: name });
    // console.log(test);
    // let categoryObject = `${req.body.category}/${req.body.object}`;
    // res.redirect('/gallery/' + categoryObject);
  });
}
module.exports = handleFormPost;
