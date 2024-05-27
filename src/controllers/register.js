const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validateRegisterPayload } = require('../helpers/validator');

const register = (req, res) => {
  try {
    const isPayloadValid = validateRegisterPayload(req.body);
    if (!isPayloadValid.status) {
      return res.status(400).json({ message: isPayloadValid.message });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: 'user',
    })
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

module.exports = register;
