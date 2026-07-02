const db = require('../../db');

// User Management
exports.getUsers = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { telegram_id } = req.params;
  const { daily_limit, is_premium } = req.body;
  try {
    await db.execute({
      sql: 'UPDATE users SET daily_limit = ?, is_premium = ? WHERE telegram_id = ?',
      args: [daily_limit, is_premium, telegram_id]
    });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { telegram_id } = req.params;
  try {
    await db.execute({
      sql: 'DELETE FROM users WHERE telegram_id = ?',
      args: [telegram_id]
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Vocabulary Management
exports.getVocabularies = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM vocabularies');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addVocabulary = async (req, res) => {
  const { language, level, word, reading, meaning, is_premium } = req.body;
  try {
    await db.execute({
      sql: 'INSERT INTO vocabularies (language, level, word, reading, meaning, is_premium) VALUES (?, ?, ?, ?, ?, ?)',
      args: [language, level, word, reading, meaning, is_premium]
    });
    res.json({ message: 'Vocabulary added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVocabulary = async (req, res) => {
  const { id } = req.params;
  const { language, level, word, reading, meaning, is_premium } = req.body;
  try {
    await db.execute({
      sql: 'UPDATE vocabularies SET language = ?, level = ?, word = ?, reading = ?, meaning = ?, is_premium = ? WHERE id = ?',
      args: [language, level, word, reading, meaning, is_premium, id]
    });
    res.json({ message: 'Vocabulary updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVocabulary = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute({
      sql: 'DELETE FROM vocabularies WHERE id = ?',
      args: [id]
    });
    res.json({ message: 'Vocabulary deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Phrase Management
exports.getPhrases = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM phrases');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addPhrase = async (req, res) => {
  const { language, level, phrase, meaning, context, is_premium } = req.body;
  try {
    await db.execute({
      sql: 'INSERT INTO phrases (language, level, phrase, meaning, context, is_premium) VALUES (?, ?, ?, ?, ?, ?)',
      args: [language, level, phrase, meaning, context, is_premium]
    });
    res.json({ message: 'Phrase added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePhrase = async (req, res) => {
  const { id } = req.params;
  const { language, level, phrase, meaning, context, is_premium } = req.body;
  try {
    await db.execute({
      sql: 'UPDATE phrases SET language = ?, level = ?, phrase = ?, meaning = ?, context = ?, is_premium = ? WHERE id = ?',
      args: [language, level, phrase, meaning, context, is_premium, id]
    });
    res.json({ message: 'Phrase updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePhrase = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute({
      sql: 'DELETE FROM phrases WHERE id = ?',
      args: [id]
    });
    res.json({ message: 'Phrase deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Session & Queue Monitoring
exports.getSessions = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM sessions');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMatchQueue = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM match_queue');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
