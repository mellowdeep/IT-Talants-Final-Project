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
      "SELECT * FROM users as u WHERE u.username = ? AND u.password = ? AND u.provider is ?",
      [username, password, provider]
    );
  },
  saveUser(id, username, password, name, role, status, provider, image) {
    return db.insertObj(
      "INSERT INTO users (id, username, password, name, role, status, provider, image) " +
      "VALUES (?,?,?,?,?,?,?,?)",
      [id,username, password, name, role, status, provider, image]
    );
  }
};

module.exports = query;

