const express = require('express');
const user = express.Router();

user.post('/login', (req, res) => {});
user.post('/register', (req, res) => {});

module.exports = user;
