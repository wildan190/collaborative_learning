const bcrypt = require('bcrypt');

/**
 * Hash password.
 * @param {string} password - Password yang akan di-hash.
 * @returns {Promise<string>} Password yang telah di-hash.
 */
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Verifikasi password.
 * @param {string} password - Password asli.
 * @param {string} hash - Hash password yang tersimpan di database.
 * @returns {Promise<boolean>} True jika cocok, false jika tidak.
 */
const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  verifyPassword,
};
