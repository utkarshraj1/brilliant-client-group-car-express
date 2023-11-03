const server = require('./src/server');
const mongoose = require('mongoose');
const { DB_URL } = require('./constants/constants');

mongoose
  .connect(DB_URL)
  .then(() => server())
  .catch(err =>
    console.log('Error occured while connecting to MongoDb Atlas: ', err)
  );
