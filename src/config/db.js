const db = require('./dbs/sqlite-db');

const insertObj = (req, params) => {
  return new Promise((resolve, reject) => {
    db.run(req,params, function(err){
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

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

module.exports = { getSingleResult, getMultipleResult, insertObj };
