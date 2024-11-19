const Note = require('../models/notes.model');

module.exports = {
  // Create a new note
  createNote: async (user_id, title, content) => {
    try {
      const note = await Note.create({ user_id, title, content });
      return note;
    } catch (error) {
      throw new Error('Error creating note: ' + error.message);
    }
  },

  // Get all notes for a user
  getNotesByUserId: async (user_id) => {
    try {
      const notes = await Note.findAll({ where: { user_id } });
      return notes;
    } catch (error) {
      throw new Error('Error fetching notes: ' + error.message);
    }
  },

  // Get a single note by its ID
  getNoteById: async (note_id, user_id) => {
    try {
      const note = await Note.findOne({ where: { note_id, user_id } });
      return note;
    } catch (error) {
      throw new Error('Error fetching note: ' + error.message);
    }
  },

  // Update a note
  updateNote: async (note_id, user_id, updatedData) => {
    try {
      const note = await Note.findOne({ where: { note_id, user_id } });
      if (!note) {
        throw new Error('Note not found');
      }

      await note.update(updatedData);
      return note;
    } catch (error) {
      throw new Error('Error updating note: ' + error.message);
    }
  },

  // Delete a note
  deleteNote: async (note_id, user_id) => {
    try {
      const result = await Note.destroy({ where: { note_id, user_id } });
      if (!result) {
        throw new Error('Note not found');
      }
      return true;
    } catch (error) {
      throw new Error('Error deleting note: ' + error.message);
    }
  },
};
