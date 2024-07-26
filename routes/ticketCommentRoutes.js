const express = require('express');
const {
  createComment,
  getCommentsByTicket,
  updateComment,
  deleteComment
} = require('../controllers/ticketCommentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createComment);
router.get('/ticket/:ticket_id', authMiddleware, getCommentsByTicket);
router.put('/:comment_id', authMiddleware, updateComment);
router.delete('/:comment_id', authMiddleware, deleteComment);

module.exports = router;
