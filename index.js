const express = require('express');
const app = express();
const sequelize = require('./db');
const userRoute = require('./src/routes/user');
const eventRoute = require('./src/routes/event');
const User = require('./src/models/user');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoute);
app.use('/events', eventRoute);

(async () => {
  try {
    await sequelize.sync();
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
})();

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error during server startup', err);
    return;
  }
  console.log('Server is runnnig on port:', PORT);
});
