const TicketComment = require('../models/ticketComment');
const Ticket = require('../models/ticket');
const User = require('../models/user');

exports.createComment = async (req, res) => {
  const { ticket_id, user_id, comment } = req.body;

  try {
    const ticket = await Ticket.findByPk(ticket_id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const ticketComment = await TicketComment.create({ ticket_id, user_id, comment });
    res.status(201).json({ ticketComment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommentsByTicket = async (req, res) => {
  const { ticket_id } = req.params;

  try {
    const comments = await TicketComment.findAll({
      where: { ticket_id },
      include: [
        { model: User, attributes: ['username', 'email'] }
      ],
    });
    res.status(200).json({ comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  const { comment_id } = req.params;
  const { comment } = req.body;

  try {
    const ticketComment = await TicketComment.findByPk(comment_id);
    if (!ticketComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    ticketComment.comment = comment || ticketComment.comment;
    ticketComment.updated_at = new Date();

    await ticketComment.save();

    res.status(200).json({ ticketComment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  try {
    const ticketComment = await TicketComment.findByPk(comment_id);
    if (!ticketComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await ticketComment.destroy();
    res.status(204).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const TicketComment = require('../models/ticketComment');
const Ticket = require('../models/ticket');
const User = require('../models/user');

exports.createComment = async (req, res) => {
  const { ticket_id, user_id, comment } = req.body;

  try {
    const ticket = await Ticket.findByPk(ticket_id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const ticketComment = await TicketComment.create({ ticket_id, user_id, comment });
    res.status(201).json({ ticketComment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommentsByTicket = async (req, res) => {
  const { ticket_id } = req.params;

  try {
    const comments = await TicketComment.findAll({
      where: { ticket_id },
      include: [
        { model: User, attributes: ['username', 'email'] }
      ],
    });
    res.status(200).json({ comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  const { comment_id } = req.params;
  const { comment } = req.body;

  try {
    const ticketComment = await TicketComment.findByPk(comment_id);
    if (!ticketComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    ticketComment.comment = comment || ticketComment.comment;
    ticketComment.updated_at = new Date();

    await ticketComment.save();

    res.status(200).json({ ticketComment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  try {
    const ticketComment = await TicketComment.findByPk(comment_id);
    if (!ticketComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await ticketComment.destroy();
    res.status(204).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
