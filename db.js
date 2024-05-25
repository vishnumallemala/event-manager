require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize, passing the connection parameters
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Disable logging or set it to console.log for detailed logs
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
