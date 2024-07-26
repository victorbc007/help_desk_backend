const express = require('express');
const { getAuditLogs } = require('../controllers/auditLogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAuditLogs);

module.exports = router;
