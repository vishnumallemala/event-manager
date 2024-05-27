const Event = require('../models/event');

const deleteEvent = (req, res) => {
  try {
    if (!(req.options.role === 'admin' || req.options.role === 'organizer')) {
      res.status(403).json({
        message:
          'Unauthorized to perform the action. Please contact administrator',
      });
    }

    Event.findOne({
      where: {
        id: req.params.id,
      },
    }).then(async (event) => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      await Event.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: 'Event deleted successfully' });
    });
  } catch (e) {
    res.status(500).send({ message: JSON.parse(JSON.stringify(e)) });
  }
};

module.exports = deleteEvent;
