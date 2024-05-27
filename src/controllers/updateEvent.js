const Event = require('../models/event');
const { validateEventUpdatePayload } = require('../helpers/validator');
const { mergeObjects } = require('../utils/util');

const updateEvent = (req, res) => {
  try {
    if (!(req.options.role === 'admin' || req.options.role === 'organizer')) {
      res.status(403).json({
        message:
          'Unauthorized to perform the action. Please contact administrator',
      });
    }
    const isPayloadValid = validateEventUpdatePayload(req.body);
    if (!isPayloadValid.status) {
      res.status(400).json({ message: isPayloadValid.message });
    }

    Event.findOne({
      where: { id: req.params.id },
      attributes: ['eventName', 'description', 'date'],
    })
      .then((event) => {
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        const updatedEventDetails = mergeObjects(event.dataValues, req.body);
        Event.update(updatedEventDetails, {
          where: { id: req.params.id },
          returning: true,
        })
          .then((updatedEvent) => {
            return res.status(200).send(updatedEvent[1]);
          })
          .catch((err) => {
            return res.status(400).send(err);
          });
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (e) {
    return res.status(500).json({ error: JSON.parse(JSON.stringify(e)) });
  }
};

module.exports = updateEvent;
