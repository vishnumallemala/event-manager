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

const validateEventCreationPayload = function (event) {
  if (
    event.hasOwnProperty('eventName') &&
    event.hasOwnProperty('date') &&
    event.hasOwnProperty('description')
  ) {
    if (event.eventName.trim() === '') {
      return {
        status: false,
        message: 'Event info is malformed, please provide eventName',
      };
    }
    if (event.description.trim() === '') {
      return {
        status: false,
        message: 'Event info is malformed, please provide description',
      };
    }
    if (event.date) {
      const date = new Date(event.date);
      const isDateValid = date instanceof Date && !isNaN(date);
      if (!isDateValid) {
        return {
          status: false,
          message: 'Event info is malformed, please provide valid date',
        };
      }
    }

    return {
      status: true,
      message: 'Validated successfully',
    };
  } else {
    return {
      status: false,
      message:
        'Event info is malformed, please provide eventName, description and date',
    };
  }
};

module.exports = {
  validateLoginPayload,
  validateRegisterPayload,
  validateEventCreationPayload,
};
