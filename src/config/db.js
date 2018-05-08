const db = require('./dbs/sqlite-db');

const getSingleResult = (req, params) =>
  new Promise((resolve, reject) => {
    db.run(req, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

const getMultipleResult = (req, params) =>
  new Promise((resolve, reject) => {
    db.all(req, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

module.exports = { getSingleResult, getMultipleResult };
