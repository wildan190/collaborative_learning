const express = require('express');
const router = express.Router();
const { registerValidator, loginValidator, validate } = require('../validators/authValidator');
const { register, login } = require('../controllers/authController');

// Rute untuk registrasi
router.post('/register', registerValidator, validate, register);

// Rute untuk login
router.post('/login', loginValidator, validate, login);

module.exports = router;
