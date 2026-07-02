-- users Table
CREATE TABLE IF NOT EXISTS users (
    telegram_id BIGINT PRIMARY KEY,
    username TEXT,
    gender TEXT,
    learning_lang TEXT,
    learning_level TEXT,
    daily_limit INT DEFAULT 3,
    is_premium BOOLEAN DEFAULT FALSE
);

-- match_queue Table
CREATE TABLE IF NOT EXISTS match_queue (
    telegram_id BIGINT PRIMARY KEY,
    learning_lang TEXT,
    learning_level TEXT,
    gender TEXT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (telegram_id) REFERENCES users(telegram_id)
);

-- sessions Table
CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_a BIGINT,
    user_b BIGINT,
    status TEXT DEFAULT 'active',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- vocabularies Table
CREATE TABLE IF NOT EXISTS vocabularies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language TEXT,
    level TEXT,
    word TEXT,
    reading TEXT,
    meaning TEXT,
    is_premium BOOLEAN DEFAULT FALSE
);

-- phrases Table
CREATE TABLE IF NOT EXISTS phrases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language TEXT,
    level TEXT,
    phrase TEXT,
    meaning TEXT,
    context TEXT,
    is_premium BOOLEAN DEFAULT FALSE
);
