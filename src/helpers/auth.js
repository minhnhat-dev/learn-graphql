let jwt = require('jsonwebtoken');
const config = require('../../config');
const { v1: uuidv1 } = require('uuid');

let verifyToken = (req, res, next) => {
  req.requestId = uuidv1();
  console.log('req.requestId: ', req.requestId);
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  req.isAuthenticated = false;
  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
        });
      } else {
        req.authUser = decoded;
        req.isAuthenticated = true;
      }
    });
  }
  next();
};

module.exports = {
  verifyToken,
};
