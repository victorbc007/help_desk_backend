const Ticket = require('../models/ticket');
const User = require('../models/user');
const Category = require('../models/category');

exports.createTicket = async (req, res) => {
  const { title, description, priority, category_id, created_by } = req.body;

  try {
    const ticket = await Ticket.create({ title, description, status: 'open', priority, category_id, created_by });
    res.status(201).json({ ticket });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        { model: User, as: 'creator', attributes: ['username', 'email'] },
        { model: User, as: 'assignee', attributes: ['username', 'email'] },
        { model: Category, attributes: ['category_name'] }
      ],
    });
    res.status(200).json({ tickets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, assigned_to } = req.body;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;
    ticket.status = status || ticket.status;
    ticket.priority = priority || ticket.priority;
    ticket.assigned_to = assigned_to || ticket.assigned_to;
    ticket.assigned_at = assigned_to ? new Date() : ticket.assigned_at;

    if (status === 'closed') {
      ticket.closed_at = new Date();
    }

    await ticket.save();

    res.status(200).json({ ticket });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    await ticket.destroy();
    res.status(204).json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
