const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validateLoginPayload } = require('../helpers/validator');
const jwt_secret = process.env.SECRET;

const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const isPayloadValid = validateLoginPayload(req.body);
    if (!isPayloadValid.status) {
      return res.status(400).json({ message: isPayloadValid.message });
    }

    //finding user based on the email
    User.findOne({
      where: { email },
    }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      var isPasswordValid = bcrypt.compareSync(password, user.password); // checking is password matching
      if (!isPasswordValid) {
        return res.status(401).send({
          message: 'Invalid Password',
        });
      } else {
        var token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          jwt_secret,
          {
            expiresIn: '8h',
          }
        );
        return res.status(200).send({
          user: {
            id: user.id,
            email: user.email,
          },
          message: 'Login successful',
          accessToken: token,
        });
      }
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

module.exports = login;
