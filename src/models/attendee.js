const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const User = require('./user');
const Event = require('./event');

// Define the Attendee model
const Attendee = sequelize.define(
  'Attendee',
  {
    // Define attributes
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
    eventId: {
      type: DataTypes.UUID,
      references: {
        model: Event,
        key: 'id',
      },
    },
  },
  {
    tableName: 'attendees',
  }
);

Attendee.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Attendee, { foreignKey: 'userId' });

Attendee.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(Attendee, { foreignKey: 'eventId' });

// Export the model
module.exports = Attendee;
