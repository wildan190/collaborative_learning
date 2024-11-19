const { check } = require('express-validator');

module.exports = {
  validateCreateNote: [
    check('title').notEmpty().withMessage('Title is required'),
    check('content').notEmpty().withMessage('Content is required'),
  ],

  validateUpdateNote: [
    check('title').optional().notEmpty().withMessage('Title must not be empty'),
    check('content').optional().notEmpty().withMessage('Content must not be empty'),
  ],
};
