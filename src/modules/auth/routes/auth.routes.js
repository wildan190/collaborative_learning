const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../validators/auth.validators');

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

module.exports = router;
