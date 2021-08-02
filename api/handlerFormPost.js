// const { default: Category } = require('../client/src/App/pages/Category');

const { find } = require('./models/photo');

function handleFormPost(app, path, fs, db) {
  const Photos = require('./models/photo');
  const Categories = require('./models/category');
  const Objects = require('./models/object');
  const ObjectId = require('mongodb').ObjectID;
  const multer = require('multer');
  const handleError = (err, res) => {
    res
      .status(500)
      .contentType('text/plain')
      .end('Oops! Something went wrong!');
  };
  const upload = multer({
    dest: '/path/to/temporary/directory/to/store/uploaded/files',
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });
  app.post('/addCategory', (req, res) => {
    console.log('test');
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
    console.log(targetDirectory);
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory);
    }
    // if (!fs.existsSync(targetDirectory)) {
    //   fs.mkdirSync(targetDirectory);
    // }
    res.end('saddsa');
  });
  app.post('/addObject', (req, res) => {
    console.log(req.body.object);
    const objectElement = new Objects({
      name: req.body.objectname,
      category: req.body.categoryname,
      description: 'test',
    });
    objectElement.save((err) => {
      console.log('blad' + err);
    });
    const targetDirectory = path.join(
      __dirname,
      `../client/src/uploads/${req.body.categoryname}/${req.body.objectname}`
    );
    console.log(targetDirectory);
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory);
    }
    res.redirect('/gallery/' + req.body.categoryname);
  });
  app.post(
    '/upload',
    upload.single('file' /* name attribute of <file> element in your form */),
    (req, res) => {
      console.log('to robi;');
      console.log(req.body);
      const tempPath = req.file.path;
      const targetPath = path.join(
        __dirname,
        `../client/src/uploads/${req.body.category}/${req.body.object}/${req.file.originalname}`
      );
      const targetDirectory = path.join(
        __dirname,
        `../client/src/uploads/${req.body.category}/${req.body.object}`
      );
      console.log(req.file.originalname);
      console.log(targetPath);
      if (!fs.existsSync(targetDirectory)) {
        fs.mkdirSync(targetDirectory);
      }
      console.log(req.body);
      if (
        path.extname(req.file.originalname).toLowerCase() === '.png' ||
        path.extname(req.file.originalname).toLowerCase() === '.jpg'
      ) {
        fs.rename(tempPath, targetPath, (err) => {
          if (err) return handleError(err, res);
          const photoElement = new Photos({
            title: req.body.fname,
            category: req.body.category,
            object: req.body.object,
            description: req.body.lname,
            url: `src/uploads/${req.body.category}/${req.body.object}/${req.file.originalname}`,
          });
          photoElement.save((err) => {
            console.log(err);
          });
          // res.status(200).contentType('text/plain').end('File uploaded!');
          // res.status(200).end();
          let categoryObject = `${req.body.category}/${req.body.object}`;
          res.redirect('/gallery/' + categoryObject);
        });
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
  app.post('/deleteElement', (req, res) => {
    console.log(req.body.url);
    db.collection('photos').deleteOne({ _id: ObjectId(req.body.id) });
    // let categoryObject = `${req.body.category}/${req.body.object}`;
    // res.redirect('/gallery/' + categoryObject);
    fs.unlink(req.body.url, function (err) {
      if (err) return console.log(err);
      console.log('usunieto element');
    });
  });
  app.post('/deleteObjectInCategory', (req, res) => {
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
