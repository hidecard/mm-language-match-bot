const db = require('../db');

module.exports = async (req, res) => {
  const { telegram_id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM users WHERE telegram_id = ?',
        args: [telegram_id]
      });
      return res.status(200).json(result.rows[0] || { error: 'Not Found' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    const { username, gender, learning_lang, learning_level } = req.body;
    try {
      await db.execute({
        sql: `INSERT INTO users (telegram_id, username, gender, learning_lang, learning_level) 
              VALUES (?, ?, ?, ?, ?) 
              ON CONFLICT(telegram_id) DO UPDATE SET 
              username=excluded.username, gender=excluded.gender, 
              learning_lang=excluded.learning_lang, learning_level=excluded.learning_level`,
        args: [telegram_id, username, gender, learning_lang, learning_level]
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
