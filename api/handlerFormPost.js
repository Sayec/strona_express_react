function handleFormPost(app, path, fs) {
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

  app.post(
    '/upload',
    upload.single('file' /* name attribute of <file> element in your form */),
    (req, res) => {
      console.log('jestem');
      const tempPath = req.file.path;
      const targetPath = path.join(
        __dirname,
        `./uploads/${req.file.originalname}`
      );
      console.log(req.file.originalname);
      console.log(targetPath);
      if (
        path.extname(req.file.originalname).toLowerCase() === '.png' ||
        path.extname(req.file.originalname).toLowerCase() === '.jpg'
      ) {
        fs.rename(tempPath, targetPath, (err) => {
          if (err) return handleError(err, res);

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
