const express = require('express');
const router = express.Router();
const { createNote, getAllNotes, getNoteById, updateNote, deleteNote } = require('../controllers/notes.controller');
const { verifyAuth } = require('../../middlewares/authMiddleware'); // Pastikan Anda memiliki middleware verifyAuth

// Rute untuk membuat catatan
router.post('/', verifyAuth, createNote);

// Rute untuk mendapatkan semua catatan
router.get('/', verifyAuth, getAllNotes);

// Rute untuk mendapatkan catatan berdasarkan ID
router.get('/:id', verifyAuth, getNoteById);

// Rute untuk memperbarui catatan berdasarkan ID
router.put('/:id', verifyAuth, updateNote);

// Rute untuk menghapus catatan berdasarkan ID
router.delete('/:id', verifyAuth, deleteNote);

module.exports = router;
