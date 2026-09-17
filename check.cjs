const pg = require('pg');

const pool = new pg.Pool({
  connectionString: 'postgresql://siddh876:tInlqWg3BkGLd1Yg6qfd98cex@168.119.64.101:5432/siddh876',
  ssl: false
});

async function check() {
  try {
    const res = await pool.query('SELECT section_key, updated_at FROM site_content ORDER BY section_key');
    console.log('PostgreSQL site_content status:', res.rows);
  } catch (e) {
    console.error('DB check error:', e.message);
  } finally {
    await pool.end();
  }
}

check();


