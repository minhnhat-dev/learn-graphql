const path = require('path');
require('dotenv').config();
const config = process.env;

config.SERVICE_NAME = config.SERVICE_NAME || 'template-service';
module.exports = config;
