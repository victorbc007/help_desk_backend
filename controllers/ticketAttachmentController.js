const TicketAttachment = require('../models/ticketAttachment');
const Ticket = require('../models/ticket');
const path = require('path');
const fs = require('fs');

exports.uploadAttachment = async (req, res) => {
  const { ticket_id, uploaded_by } = req.body;
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ticket = await Ticket.findByPk(ticket_id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const ticketAttachment = await TicketAttachment.create({
      ticket_id,
      file_path: file.path,
      uploaded_by,
    });

    res.status(201).json({ ticketAttachment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAttachmentsByTicket = async (req, res) => {
  const { ticket_id } = req.params;

  try {
    const attachments = await TicketAttachment.findAll({ where: { ticket_id } });
    res.status(200).json({ attachments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAttachment = async (req, res) => {
  const { attachment_id } = req.params;

  try {
    const attachment = await TicketAttachment.findByPk(attachment_id);
    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found' });
    }

    // Remove the file from the filesystem
    fs.unlink(path.resolve(attachment.file_path), (err) => {
      if (err) {
        console.error(err);
      }
    });

    await attachment.destroy();
    res.status(204).json({ message: 'Attachment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
