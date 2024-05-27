const express = require('express');
const event = express.Router();
const validateToken = require('../middleware/verifyJWT');
const fetchEvent = require('../controllers/findEvent');
const createEvent = require('../controllers/createEvent');
const updateEvent = require('../controllers/updateEvent');
const deleteEvent = require('../controllers/deleteEvent');

event.get('/', validateToken, fetchEvent);
event.post('/', validateToken, createEvent);
event.put('/:id', validateToken, updateEvent);
event.delete('/', validateToken, deleteEvent);
event.post('/:id/register', validateToken, (req, res) => {});

module.exports = event;
