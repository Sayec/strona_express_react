function listRoutes(app) {
  app.get('/api/getList', (req, res) => {
    const list = ['item1', 'item2', 'item3', 'dsadsa', 'test123'];
    console.log(list);
    res.json(list);
    console.log('Sent list of items');
  });
}
module.exports = listRoutes;
