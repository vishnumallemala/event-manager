const express = require('express');
const event = express.Router();

event.get('/', (req, res) => {});
event.post('/', (req, res) => {});
event.put('/:id', (req, res) => {});
event.delete('/', (req, res) => {});
event.post('/:id/register', (req, res) => {});

module.exports = event;
