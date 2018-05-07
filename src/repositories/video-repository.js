const db = require("../config/db");

const query = {
  findByUUID(uuid) {
    return db.getSingleResult(
      "SELECT * FROM videos AS v WHERE v.uuid = ?", uuid
    )}
};

module.exports = query;
