const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const User = require('./user');

// Define the Events model
const Event = sequelize.define(
  'Event',
  {
    // Define attributes
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Invalid date',
        },
      },
    },
    createdBy: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'events',
  }
);

Event.belongsTo(User, { foreignKey: 'createdBy', as: 'organizer' });
User.hasMany(Event, { foreignKey: 'createdBy' });

// Export the model
module.exports = Event;
