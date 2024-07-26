const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Ticket = require('./ticket');
const User = require('./user');

const TicketAttachment = sequelize.define('TicketAttachment', {
  attachment_id: {
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
  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploaded_by: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
    onDelete: 'SET NULL',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'ticket_attachments',
  timestamps: false,
});

module.exports = TicketAttachment;
