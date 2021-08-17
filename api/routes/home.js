function homeRoutes(app, path) {
  // Handles any requests that don't match the ones above
  app.get('/admin', (req, res) => {
    const list = ['item1', 'item2', 'item3', 'item32321321'];
    console.log('halo');
    // res.json(list);
    res.cookie(`admin`, `true`);
    res.send('Cookie have been saved successfully');
  });
  app.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies);
    res.send(req.cookies);
  });
}

module.exports = homeRoutes;
