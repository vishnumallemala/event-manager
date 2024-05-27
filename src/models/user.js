const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

// Define the User model
const User = sequelize.define(
  'User',
  {
    // Define attributes
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user', 'organizer'],
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  }
);

// Export the model
module.exports = User;
