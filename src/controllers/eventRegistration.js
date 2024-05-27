const Attendee = require('../models/attendee');
const Event = require('../models/event');
const User = require('../models/user');
const { sendEmail } = require('../utils/util');

const eventRegistration = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.options.userId;

    const event = await Event.findOne({
      where: { id: eventId },
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Attendee.findOne({
      where: { userId, eventId },
    })
      .then(async (data) => {
        if (data) {
          return res
            .status(200)
            .json({ message: 'You have already registered for the event' });
        }
        const attendee = await Attendee.create({
          userId,
          eventId,
        });

        const message = {
          to: req.options.email,
          subject: 'Event Registration Confirmation',
          text: `Hello ${user.name}\n\nYou have successfully registerd for below event.\n Event Name: ${event.eventName}\n Description: ${event.description}\n Event Date: ${event.date}`,
        };
        await sendEmail(message);
        res.status(200).json({ message: 'Event registration successful' });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

module.exports = eventRegistration;
