const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const UserTeam = sequelize.define('UserTeam', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'user_id',
    },
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  team_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'teams',
      key: 'team_id',
    },
    onDelete: 'CASCADE',
    primaryKey: true,
  }
}, {
  tableName: 'user_teams',
  timestamps: false,
});

module.exports = UserTeam;
