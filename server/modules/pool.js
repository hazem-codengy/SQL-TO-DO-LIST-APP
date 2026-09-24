const pg = require('pg');

let config = {};

// إذا كان متغيّر DATABASE_URL موجود (وهو اللي هنضيفه في PieHost)
if (process.env.DATABASE_URL) {
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // ضروري جداً لتشفير الاتصال مع Supabase
    }
  };
} else {
  // إعدادات المحلي (لو شغال local)
  config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'tasks',
    ssl: false
  };
}

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('PostgreSQL Connected Successfully!');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
