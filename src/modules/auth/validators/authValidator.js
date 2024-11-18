const { body, validationResult } = require('express-validator');

// Validator untuk registrasi (register)
const registerValidator = [
  body('username')
    .isLength({ min: 3 }).withMessage('Username harus lebih dari 3 karakter.')
    .isAlphanumeric().withMessage('Username hanya boleh mengandung huruf dan angka.'),

  body('email')
    .isEmail().withMessage('Email tidak valid.')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 }).withMessage('Password harus lebih dari 6 karakter.')
    .matches(/[0-9]/).withMessage('Password harus mengandung angka.')
    .matches(/[A-Z]/).withMessage('Password harus mengandung huruf kapital.')
    .matches(/[a-z]/).withMessage('Password harus mengandung huruf kecil.'),

  // Validator untuk memastikan password dan confirmPassword cocok
  body('confirmPassword')
    .exists().withMessage('Konfirmasi password diperlukan.')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Password dan konfirmasi password tidak cocok.')
];

// Validator untuk login
const loginValidator = [
//   body('username')
//     .notEmpty().withMessage('Username diperlukan.')
//     .isAlphanumeric().withMessage('Username hanya boleh mengandung huruf dan angka.'),

  body('password')
    .notEmpty().withMessage('Password diperlukan.')
    .isLength({ min: 6 }).withMessage('Password harus lebih dari 6 karakter.')
];

// Middleware untuk memeriksa apakah ada kesalahan validasi
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  registerValidator,
  loginValidator,
  validate
};
