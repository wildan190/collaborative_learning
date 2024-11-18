const jwt = require('jsonwebtoken');

/**
 * Membuat token JWT.
 * @param {Object} payload - Data yang akan dimasukkan ke dalam token.
 * @param {string} secret - Secret key untuk signing token.
 * @param {Object} options - Opsi token (misalnya durasi).
 * @returns {string} Token JWT.
 */
const createToken = (payload, secret, options = {}) => {
  return jwt.sign(payload, secret, options);
};

/**
 * Verifikasi token JWT.
 * @param {string} token - Token JWT yang akan diverifikasi.
 * @param {string} secret - Secret key yang digunakan untuk verifikasi.
 * @returns {Object} Payload token jika valid.
 * @throws Error jika token tidak valid atau expired.
 */
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  createToken,
  verifyToken,
};
