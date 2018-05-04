const db = require('../config/dbs/sqlite-db');

function createPromise(req) {
  return new Promise((resolve, reject) => {
    db.query(req, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const query = {
  findByUserName(username) {
    return createPromise(
      `SELECT * FROM users as u WHERE u.username = ${db.escape(username)}`,
    );
  },
  findAll() {
    return createPromise('SELECT * FROM users as u');
  },
  findById(id) {
    return createPromise(
      `SELECT * FROM users as u WHERE u.id = ${db.escape(id)}`,
    );
  },
};

module.exports = query;
