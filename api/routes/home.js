function homeRoutes(app, path) {
  // Handles any requests that don't match the ones above
  // app.get('/l', (req, res) => {
  //   const list = ['item1', 'item2', 'item3', 'item32321321'];
  //   res.json(list);
  // });
  app.get('/', (req, res) => {
    const list = ['item3', 'dsadsa', 'test123'];
    console.log(list);
    // console.log(__dirname);
    // res.sendFile(path.join(__dirname + '/../../client/public/index.html'));
    res.json(list);
  });
}

module.exports = homeRoutes;
