const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  url: 'libsql://language-hidecatd.aws-ap-northeast-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODI0NDg3NzgsImlkIjoiMDE5ZjAyMzktYzcwMS03NzhjLThjYTMtYTgyMmYyMDBmNDlkIiwicmlkIjoiZjBhOTAwMzctNTIxOS00M2ZjLTg5NTQtMTU4ZjNmNmY5NWE5In0.acDb07UjPuSdd1rKjkGl_-5Q-XnwZowdZW1yavDyQJltEXVu6avcjWPV4o0AH19al_EZXjQGDGReg3P-ZJUiBQ',
});

async function init() {
  const schemaPath = path.join(__dirname, '../db/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const statements = schema.split(';').filter(s => s.trim());

  console.log('Starting database initialization...');
  for (const statement of statements) {
    try {
      await client.execute(statement);
      console.log('Executed:', statement.split('\n')[0].trim() + '...');
    } catch (err) {
      console.error('Error executing statement:', err.message);
    }
  }
  console.log('Database initialization complete!');
}

init();
