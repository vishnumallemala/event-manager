const express = require('express');
const user = express.Router();
const { v1: register } = require('../controllers/register');
const { v1: login } = require('../controllers/login');

user.post('/login', login);
user.post('/register', register);

module.exports = user;
