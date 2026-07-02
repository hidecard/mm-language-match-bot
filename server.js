const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const adminRoutes = require('./src/admin/routes/adminRoutes');
const matchHandler = require('./src/api/match');
const userHandler = require('./src/api/user');
const webhookHandler = require('./src/api/webhook');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'admin_dashboard/public')));

// Admin API Routes
app.use('/api/admin', adminRoutes);

// Bot API Routes - wrap serverless handlers in Express middleware
app.post('/api/match', matchHandler);
app.get('/api/user', userHandler);
app.post('/api/user', userHandler);
app.post('/api/webhook', webhookHandler);

// Serve Admin Dashboard Frontend
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin_dashboard/views/index.html'));
});

// Serve main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;

// Only listen if running directly (not via Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Admin Dashboard available at http://localhost:${PORT}/admin`);
  });
}
