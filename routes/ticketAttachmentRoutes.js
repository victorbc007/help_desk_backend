const express = require('express');
const multer = require('multer');
const {
  uploadAttachment,
  getAttachmentsByTicket,
  deleteAttachment
} = require('../controllers/ticketAttachmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('file'), uploadAttachment);
router.get('/ticket/:ticket_id', authMiddleware, getAttachmentsByTicket);
router.delete('/:attachment_id', authMiddleware, deleteAttachment);

module.exports = router;
