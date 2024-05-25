const express = require('express');
const app = express();
const userRoute = require('./src/routes/user');
const eventRoute = require('./src/routes/event');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/user', userRoute);
app.use('/event', eventRoute);

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error during server startup');
    return;
  }
  console.log('Server is runnnig on port:', PORT);
});
