const Note = require('../models/notes.model');

// Membuat catatan baru
const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.create({
      title,
      content,
      userId: req.user.id, // Menggunakan ID user dari token
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong while creating the note.' });
  }
};

// Mendapatkan semua catatan pengguna
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { userId: req.user.id }, // Filter berdasarkan user yang login
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong while fetching notes.' });
  }
};

// Mengambil satu catatan berdasarkan ID
const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({
      where: { id, userId: req.user.id }, // Hanya user yang sama yang bisa melihat catatannya
    });
    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong while fetching the note.' });
  }
};

// Memperbarui catatan
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await Note.findOne({ where: { id, userId: req.user.id } });
    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong while updating the note.' });
  }
};

// Menghapus catatan
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ where: { id, userId: req.user.id } });
    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    await note.destroy();
    res.status(204).json({ message: 'Note deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong while deleting the note.' });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
