const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const userTeamRoutes = require('./routes/userTeamRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const ticketCommentRoutes = require('./routes/ticketCommentRoutes');
const ticketAttachmentRoutes = require('./routes/ticketAttachmentRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); 

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/user-teams', userTeamRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/comments', ticketCommentRoutes);
app.use('/api/attachments', ticketAttachmentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
