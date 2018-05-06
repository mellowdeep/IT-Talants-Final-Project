const db = require('../config/db');

const query = {
  findByUserName(username, provider) {
    return db.getSingleResult(
      "SELECT * FROM users as u WHERE u.username = ? AND u.provider = ?", [username, provider]
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
      "SELECT * FROM users as u WHERE u.username = ? AND u.password = ? AND u.provider = ?", [username, password, provider]
    );
  },
  saveUser(username, password) {
    return db.getSingleResult(
      "INSERT INTO users (username, password) VALUES (?, ?)", [username, password]
    );
  }
};

module.exports = query;

