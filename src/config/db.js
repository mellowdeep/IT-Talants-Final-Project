const db = require("./dbs/sql.lite.db");


const getSingleResult = (req, params) => {
  return new Promise((resolve, reject) => {
    db.run(req,params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getMultipleResult = (req, params) => {
  return new Promise((resolve, reject) => {
    db.all(req, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {getSingleResult, getMultipleResult};
