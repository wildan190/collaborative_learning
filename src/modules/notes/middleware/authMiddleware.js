const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Pastikan Anda memiliki model User

const verifyAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token is required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan data pengguna yang didekodekan pada request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = { verifyAuth };
