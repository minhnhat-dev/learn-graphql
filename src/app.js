'use strict';

/*
 * This file exports the app that is used by the server to expose the routes.
 * And make the routes visible.
 */

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const auth = require('./helpers/auth');
const database = require('../src/models/db');
// Express App
const app = express();

/* connect database */
database.connectDb();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Use default logger for now
app.use(logger('dev'));
app.use(cors());
//app.use(auth.verifyToken);

// This is to check if the service is online or not
app.use('/ping', function (req, res) {
  res.json({ reply: 'pong' });
  res.end();
});

// Export the express app instance
module.exports = app;
