const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware untuk memverifikasi token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(403).json({ error: 'Token tidak ditemukan.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Menyimpan data pengguna yang terverifikasi di request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token tidak valid.' });
  }
};

module.exports = {
  verifyToken
};
