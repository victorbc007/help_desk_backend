const Team = require('../models/team');

exports.createTeam = async (req, res) => {
  const { team_name } = req.body;

  try {
    const team = await Team.create({ team_name });
    res.status(201).json({ team });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json({ teams });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTeam = async (req, res) => {
  const { id } = req.params;
  const { team_name } = req.body;

  try {
    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    team.team_name = team_name || team.team_name;
    await team.save();

    res.status(200).json({ team });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    await team.destroy();
    res.status(204).json({ message: 'Team deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
