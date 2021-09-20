function homeRoutes(app, path) {
  // Handles any requests that don't match the ones above
  app.post('/loginValidate', (req, res) => {
    console.log('test');

    const { username, password } = req.body;
    console.log(username, password);
    // res.json(list);
    if (
      username === process.env.username_admin &&
      password === process.env.password_admin
    ) {
      res.cookie(`admin`, `true`, {
        expires: new Date(Date.now() + 10 * 60 * 1000), //minutes*seconds*ms
        httpOnly: true,
      });
    }
    res.redirect(req.originalUrl);
  });
  app.get('/getcookie', (req, res) => {
    //show the saved cookies
    // console.log(req.cookies);
    res.send(req.cookies);
  });
}

module.exports = homeRoutes;
