//validates payload send for login request
const validateLoginPayload = function (user) {
  if (user.hasOwnProperty('email') && user.hasOwnProperty('password')) {
    if (user.password == '') {
      return {
        status: false,
        message: 'Please provide password',
      };
    }
    if (user.email == '') {
      return {
        status: false,
        message: 'Please provide email',
      };
    }

    return {
      status: true,
      message: 'Validated successfully',
    };
  } else {
    return {
      status: false,
      message: 'Please provide email and password to login',
    };
  }
};

//Validates payload sent for register api
const validateRegisterPayload = function (user) {
  if (
    user.hasOwnProperty('email') &&
    user.hasOwnProperty('password') &&
    user.hasOwnProperty('name')
  ) {
    if (user.name == '') {
      return {
        status: false,
        message: 'User info is malformed, please provide name',
      };
    }
    if (user.password == '') {
      return {
        status: false,
        message: 'User info is malformed, please provide password',
      };
    }
    if (user.email == '') {
      return {
        status: false,
        message: 'User info is malformed, please provide email',
      };
    }

    return {
      status: true,
      message: 'Validated successfully',
    };
  } else {
    return {
      status: false,
      message:
        'User info is malformed, please provide all the name, email and password',
    };
  }
};

const validateEventCreationPayload = function (event) {};

module.exports = {
  validateLoginPayload,
  validateRegisterPayload,
  validateEventCreationPayload,
};
