const pg = require('pg');

const config = {
  database: 'postgres',
  host: '01b653e7ba66420d541abfd675afcbde.gres.pie.host',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to postgress');
});

pool.on('error', (error) => {
  console.log('ERROR: Connecting to postgres');
});

module.exports = pool;
