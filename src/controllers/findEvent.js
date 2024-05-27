const Event = require('../models/event');
const User = require('../models/user');

const fetchEvents = (req, res) => {
  try {
    Event.findAll({
      include: {
        model: User,
        as: 'organizer',
        attributes: ['name', 'email'],
      },
      attributes: ['id', 'eventName', 'description', 'date'],
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } catch (e) {
    res.status(500).json({ message: JSON.parse(JSON.stringify(e)) });
  }
};

module.exports = fetchEvents;
