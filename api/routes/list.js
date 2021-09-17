function listRoutes(app) {
  app.get('/api/getList', (req, res) => {
    const list = ['item1', 'item2', 'item3', 'dsadsa', 'test123'];
    res.json(list);
  });
}
module.exports = listRoutes;
