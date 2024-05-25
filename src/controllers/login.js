const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt_secret = process.env.SECRET;

const login = {
  v1: (req, res) => {},
};

module.exports = login;
