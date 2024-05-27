const Event = require('../models/event');
const { validateEventCreationPayload } = require('../helpers/validator');

const createEvent = (req, res) => {
  try {
    if (!(req.options.role === 'admin' || req.options.role === 'organizer')) {
      res.status(403).json({
        message:
          'Unauthorized to perform the action. Please contact administrator',
      });
    }
    const isPayloadValid = validateEventCreationPayload(req.body);
    if (!isPayloadValid.status) {
      return res.status(400).json({ message: isPayloadValid.message });
    }

    const { eventName, description, date } = req.body;
    Event.create({
      eventName,
      description,
      date,
      createdBy: req.options.userId,
    })
      .then((event) => {
        res.status(201).json({ event, message: 'Event created successfully' });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } catch (e) {
    res.status(500).json({ error: JSON.parse(JSON.stringify(e)) });
  }
};

module.exports = createEvent;
