const sqlite = require('sqlite3').verbose();

const connection = new sqlite.Database(
  'src/config/dbs/project.db',
  sqlite.OPEN_READWRITE,
  err => {
    if (err) throw err;
    console.log('Connected to the database.');
  },
);

module.exports = connection;
