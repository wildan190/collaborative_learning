const express = require('express');
const router = express.Router();
const NotesController = require('../controllers/notes.controller');
const { authenticate } = require('../../auth/middleware/auth.middleware');

router.post('/', authenticate, NotesController.createNote);
router.get('/', authenticate, NotesController.getNotes);
router.get('/:id', authenticate, NotesController.getNotes);
router.put('/:id', authenticate, NotesController.updateNote);
router.delete('/:id', authenticate, NotesController.deleteNote);

module.exports = router;

