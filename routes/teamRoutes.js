const express = require('express');
const {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam
} = require('../controllers/teamController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTeam);
router.get('/', authMiddleware, getTeams);
router.put('/:id', authMiddleware, updateTeam);
router.delete('/:id', authMiddleware, deleteTeam);

module.exports = router;
