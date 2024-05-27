const express = require('express');
const user = express.Router();
const register = require('../controllers/register');
const login = require('../controllers/login');

user.post('/login', login);
user.post('/register', register);

module.exports = user;
