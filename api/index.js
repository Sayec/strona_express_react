const cookieSession = require('cookie-session');
const express = require('express');
const config = require('./config');
const path = require('path');

const app = express();

const homeRoutes = require('./routes/home');
const listRoutes = require('./routes/list');
// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
app.use(
  cookieSession({
    name: 'session',
    keys: config.keySession,
    maxAge: config.maxAgeSession, // 24 hours
  })
);
listRoutes(app);
homeRoutes(app, path);

// An api endpoint that returns a short list of items
// app.get('/api/getList', (req, res) => {
//   const list = ['item1', 'item2', 'item3', 'dsadsa', 'test123'];
//   console.log(list);
//   res.json(list);
//   console.log('Sent list of items');
// });

// Handles any requests that don't match the ones above
console.log('tes23t');
// app.get('*', (req, res) => {
//   console.log('test');
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
