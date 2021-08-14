'use strict';
const express = require('express');
const cors = require('cors');
const router = require('../usecases');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/v1', router);
app.listen(
  3000,
  () => console.log('CORS-enabled web server listening on port 3000')
);

module.exports = app;
