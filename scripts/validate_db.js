const { createClient } = require('@libsql/client');

const client = createClient({
  url: 'libsql://language-hidecatd.aws-ap-northeast-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODI0NDg3NzgsImlkIjoiMDE5ZjAyMzktYzcwMS03NzhjLThjYTMtYTgyMmYyMDBmNDlkIiwicmlkIjoiZjBhOTAwMzctNTIxOS00M2ZjLTg5NTQtMTU4ZjNmNmY5NWE5In0.acDb07UjPuSdd1rKjkGl_-5Q-XnwZowdZW1yavDyQJltEXVu6avcjWPV4o0AH19al_EZXjQGDGReg3P-ZJUiBQ',
});

async function validate() {
  try {
    const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table';");
    console.log('Tables found in database:');
    tables.rows.forEach(row => console.log(`- ${row.name}`));
    
    if (tables.rows.length >= 5) {
      console.log('✅ All tables are successfully created.');
    } else {
      console.log('⚠️ Some tables might be missing.');
    }
  } catch (err) {
    console.error('❌ Validation failed:', err.message);
  }
}

validate();
