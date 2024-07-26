const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const Ticket = require('./ticket');

const TicketComment = sequelize.define('TicketComment', {
  comment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ticket,
      key: 'ticket_id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
    onDelete: 'SET NULL',
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'ticket_comments',
  timestamps: false,
});

module.exports = TicketComment;
