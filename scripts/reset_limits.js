const db = require('../db');
const cron = require('node-cron');

// Reset daily limits at 12:00 AM every day
const resetLimits = async () => {
  console.log('Resetting daily limits...');
  try {
    await db.execute('UPDATE users SET daily_limit = 3 WHERE is_premium = FALSE');
    console.log('Daily limits reset successfully.');
  } catch (error) {
    console.error('Error resetting limits:', error);
  }
};

// Schedule for 00:00 every day
cron.schedule('0 0 * * *', resetLimits);

// Also export for manual trigger or serverless cron
module.exports = resetLimits;
