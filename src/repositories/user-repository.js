const db = require('../config/db');

const query = {
  findByUserName(username, provider) {
    return db.getSingleResult(
      "SELECT * FROM users as u WHERE u.username = ? AND u.provider is ?", [username, provider]
    );
  },
  findAll() {
    return db.getMultipleResult("SELECT * FROM users as u");
  },
  findById(id) {
    return db.getSingleResult(
      "SELECT * FROM users as u WHERE u.id = ?", id
    );
  },
  findByUserNameAndPassword(username, password, provider) {
    return db.getSingleResult(
      "SELECT * FROM users as u WHERE u.username = ? AND u.password = ? AND u.provider is ?", [username, password, provider]
    );
  },
  saveUser(username, password, name, role, status) {
    return db.insertObj(
      "INSERT INTO users (username, password, name, role, status) VALUES (?,?,?,?,?)",
      [username, password, name, role, status]
    );
  }
};

module.exports = query;

