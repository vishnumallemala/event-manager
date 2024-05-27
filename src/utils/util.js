require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  sendEmail: (message) => {
    message['from'] = 'reddy13012000@gmail.com';

    return sgMail.send(message);
  },

  mergeObjects: (parent, child) => {
    const mergedObj = {};
    for (key in parent) {
      mergedObj[key] =
        child[key] && child[key] != '' ? child[key] : parent[key];
    }
    return mergedObj;
  },
};
