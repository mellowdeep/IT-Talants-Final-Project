const bcrypt = require('bcrypt');

function getPasswordHash(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePasswordAndHash(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { getPasswordHash, comparePasswordAndHash };
