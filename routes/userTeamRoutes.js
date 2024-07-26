const express = require('express');
const {
  addUserToTeam,
  removeUserFromTeam,
  getTeamsForUser,
  getUsersForTeam
} = require('../controllers/userTeamController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addUserToTeam);
router.delete('/:user_id/:team_id', authMiddleware, removeUserFromTeam);
router.get('/user/:user_id', authMiddleware, getTeamsForUser);
router.get('/team/:team_id', authMiddleware, getUsersForTeam);

module.exports = router;
