const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes');
const { PORT } = require('../constants/constants');

const server = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(router);

  app.listen(PORT, () => {
    console.log('App is listening on port:', PORT);
  });
};

module.exports = server;
