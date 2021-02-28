// const { default: Category } = require('../client/src/App/pages/Category');

function handleFormPost(app, path, fs) {
  const Photos = require('./models/photo');
  const Categories = require('./models/category');
  const Objects = require('./models/object');
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
    res.end('saddsa');
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
      if (
        path.extname(req.file.originalname).toLowerCase() === '.png' ||
        path.extname(req.file.originalname).toLowerCase() === '.jpg'
      ) {
        fs.rename(tempPath, targetPath, (err) => {
          if (err) return handleError(err, res);
          const photoElement = new Photos({
            title: 'testowy',
            category: req.body.category,
            object: req.body.object,
            description: 'test',
            url: targetPath,
          });
          photoElement.save((err) => {
            console.log(err);
          });
          res.status(200).contentType('text/plain').end('File uploaded!');
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
}
module.exports = handleFormPost;
