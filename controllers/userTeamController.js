const UserTeam = require('../models/userTeam');
const User = require('../models/user');
const Team = require('../models/team');

exports.addUserToTeam = async (req, res) => {
  const { user_id, team_id } = req.body;

  try {
    const user = await User.findByPk(user_id);
    const team = await Team.findByPk(team_id);

    if (!user || !team) {
      return res.status(404).json({ error: 'User or Team not found' });
    }

    await UserTeam.create({ user_id, team_id });
    res.status(201).json({ message: 'User added to team successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.removeUserFromTeam = async (req, res) => {
  const { user_id, team_id } = req.params;

  try {
    const userTeam = await UserTeam.findOne({ where: { user_id, team_id } });

    if (!userTeam) {
      return res.status(404).json({ error: 'User not in team' });
    }

    await userTeam.destroy();
    res.status(200).json({ message: 'User removed from team successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeamsForUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findByPk(user_id, {
      include: {
        model: Team,
        through: { attributes: [] },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ teams: user.Teams });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersForTeam = async (req, res) => {
  const { team_id } = req.params;

  try {
    const team = await Team.findByPk(team_id, {
      include: {
        model: User,
        through: { attributes: [] },
      },
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.status(200).json({ users: team.Users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
