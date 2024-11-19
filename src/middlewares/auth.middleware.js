const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const pool = require('../config/database');

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied, token required.' });
    }

    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }

      // Simpan user_id ke dalam request untuk digunakan pada route berikutnya
      req.userId = decoded.user_id;
      next();
    });
  },
};
