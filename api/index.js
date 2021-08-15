const cookieSession = require('cookie-session');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');
const fs = require('fs');
// mongodb+srv://admin:admin@cluster0.xli15.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db connedc');
});

const handleFormPost = require('./handlerFormPost');

const homeRoutes = require('./routes/home');
const listRoutes = require('./routes/list');
const galleryRoutes = require('./routes/gallery');
app.use(
  cookieSession({
    name: 'session',
    keys: config.keySession,
    maxAge: config.maxAgeSession, // 24 hours
  })
);

listRoutes(app);
galleryRoutes(app, path, db);
homeRoutes(app, path);
handleFormPost(app, path, fs, db);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, '/client/public')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });
}
const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
