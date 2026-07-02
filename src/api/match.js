const db = require('../db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { telegram_id } = req.body;

  try {
    // 1. Get User Info
    const userResult = await db.execute({
      sql: 'SELECT * FROM users WHERE telegram_id = ?',
      args: [telegram_id]
    });
    const user = userResult.rows[0];

    if (!user) return res.status(404).json({ error: 'User not found' });

    // 2. Check Daily Limit for Free Users
    if (!user.is_premium && user.daily_limit <= 0) {
      return res.status(403).json({ error: 'Daily limit reached' });
    }

    // 3. Find Match in Queue
    let matchQuery = `
      SELECT * FROM match_queue 
      WHERE telegram_id != ? 
      AND learning_lang = ? 
      AND learning_level = ?
    `;
    let args = [telegram_id, user.learning_lang, user.learning_level];

    // Premium users can filter by gender (if implemented in request)
    if (user.is_premium && req.body.gender_filter) {
      matchQuery += ' AND gender = ?';
      args.push(req.body.gender_filter);
    }

    matchQuery += ' ORDER BY joined_at ASC LIMIT 1';

    const matchResult = await db.execute({ sql: matchQuery, args });
    const match = matchResult.rows[0];

    if (match) {
      // 4. Match Found: Create Session and Remove from Queue
      await db.batch([
        { sql: 'DELETE FROM match_queue WHERE telegram_id IN (?, ?)', args: [telegram_id, match.telegram_id] },
        { sql: 'INSERT INTO sessions (user_a, user_b) VALUES (?, ?)', args: [telegram_id, match.telegram_id] }
      ]);

      // Deduct limit if not premium
      if (!user.is_premium) {
        await db.execute({ sql: 'UPDATE users SET daily_limit = daily_limit - 1 WHERE telegram_id = ?', args: [telegram_id] });
      }

      return res.status(200).json({ status: 'matched', partner: match.telegram_id });
    } else {
      // 5. No Match: Add to Queue
      await db.execute({
        sql: 'INSERT OR REPLACE INTO match_queue (telegram_id, learning_lang, learning_level, gender) VALUES (?, ?, ?, ?)',
        args: [telegram_id, user.learning_lang, user.learning_level, user.gender]
      });
      return res.status(200).json({ status: 'queued' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
