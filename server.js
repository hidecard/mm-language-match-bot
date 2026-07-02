const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const adminRoutes = require('./src/admin/routes/adminRoutes');
const matchRoutes = require('./src/api/match');
const userRoutes = require('./src/api/user');
const webhookRoutes = require('./src/api/webhook');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'admin_dashboard/public')));

// Admin API Routes
app.use('/api/admin', adminRoutes);

// Existing Bot API Routes (assuming they were intended to be used as Express routes)
app.use('/api/match', matchRoutes);
app.use('/api/user', userRoutes);
app.use('/api/webhook', webhookRoutes);

// Serve Admin Dashboard Frontend
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin_dashboard/views/index.html'));
});

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Admin Dashboard available at http://localhost:${PORT}/admin`);
});
