const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const generateToken = (userId) => {
    const payload = { userId }; // Harus menyertakan userId
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: process.env.JWT_EXPIRATION || '1h' };
  
    return jwt.sign(payload, secret, options);
  };
  

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, verifyToken };
