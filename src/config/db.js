const db = require('./dbs/sqlite-db');

const insertObj = (req, params) =>
  new Promise((resolve, reject) => {
    db.run(req, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });

const deleteObj = (req, params) =>
  new Promise((resolve, reject) => {
    db.run(req, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });

const updateObj = (req, params) =>
  new Promise((resolve, reject) => {
    db.run(req, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });

const getSingleResult = (req, params) =>
  new Promise((resolve, reject) => {
    db.get(req, params, (err, result) => {
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

module.exports = { getSingleResult, getMultipleResult, insertObj, deleteObj, updateObj };
