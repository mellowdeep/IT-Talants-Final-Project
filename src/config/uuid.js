const crypto = require('crypto');

const LEN = 8;

const getRandomValueBase64 = () =>
  crypto
    .randomBytes(Math.ceil(LEN * 3 / 4))
    .toString('base64')
    .slice(0, LEN)
    .replace(/\+/g, '0')
    .replace(/\//g, '0');

module.exports = getRandomValueBase64;
