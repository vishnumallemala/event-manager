const jwt = require('jsonwebtoken');
const User = require('../models/user');

// middleware to verify the token
const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    let token =
      req.headers.authorization.substring(0, 7) == 'Bearer '
        ? req.headers.authorization.substring(7)
        : req.headers.authorization;
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res
          .status(401)
          .send('User is not Authenticated to perform the operation');
      } else {
        req['options'] = {
          email: decoded.email,
          userId: decoded.id,
          role: decoded.role,
        };
        next();
      }
    });
  } else {
    res.status(401).send('User is not Authenticated to perform the operation');
  }
};

module.exports = verifyToken;
