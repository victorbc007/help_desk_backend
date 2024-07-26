const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const UserTeam = require('./userTeam');

const Team = sequelize.define('Team', {
  team_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'teams',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Team.belongsToMany(User, { through: UserTeam, foreignKey: 'team_id' });
User.belongsToMany(Team, { through: UserTeam, foreignKey: 'user_id' });

module.exports = Team;
