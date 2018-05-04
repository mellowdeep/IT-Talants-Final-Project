const bcrypt = require('bcrypt');

function getPasswordHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function comparePasswordAndHash(password, hash) {
  return bcrypt.compareSync(password, hash);
}

// USAGE EXAMPLE
// const { getPasswordHash, comparePasswords } = require('./services/password');
// const h1 = getPasswordHash('test');
// const h2 = getPasswordHash('test');
// console.log(comparePasswordAndHash('test', h1)); // true
// console.log(h1); // $2b$10$ireLiwCt4GIPpi6OhDDjI.Fxw12naCOXqCYe0xdgdFAQrn8vmQ0ca
// console.log(comparePasswordAndHash('test', h2)); // true
// console.log(h2); // $2b$10$B0qWKjqV9WcSu8apI6jYfe6SX5z1jA77H9OwM2icnp/wJvUvJV7/q
// console.log(comparePasswordAndHash('test1', h2)); // false

module.exports = { getPasswordHash, comparePasswordAndHash };
