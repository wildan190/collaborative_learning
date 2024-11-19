const { sendSuccessResponse, sendErrorResponse } = require('../../../utils/response.util');
const NotesService = require('../services/notes.services');

module.exports = {
  // Create a new note
  createNote: async (req, res) => {
    try {
      const { title, content } = req.body;
      const user_id = req.user.id; // Assuming user ID is stored in req.user after authentication

      const note = await NotesService.createNote(user_id, title, content);
      sendSuccessResponse(res, note, 'Note created successfully');
    } catch (error) {
      sendErrorResponse(res, error, 'Failed to create note');
    }
  },

  // Get all notes for the authenticated user
  getNotes: async (req, res) => {
    try {
      const user_id = req.user.id; // Assuming user ID is stored in req.user
      const notes = await NotesService.getNotesByUserId(user_id);
      sendSuccessResponse(res, notes, 'Notes fetched successfully');
    } catch (error) {
      sendErrorResponse(res, error, 'Failed to fetch notes');
    }
  },

  // Get a single note
  getNotes: async (req, res) => {
    try {
      const user_id = req.user.id; // Ambil user_id dari req.user
      if (!user_id) {
        return sendErrorResponse(res, null, 'User ID is missing', 400);
      }

      const notes = await NotesService.getNotesByUserId(user_id);
      sendSuccessResponse(res, notes, 'Notes fetched successfully');
    } catch (error) {
      sendErrorResponse(res, error, 'Failed to fetch notes');
    }
  },

  // Update a note
  updateNote: async (req, res) => {
    try {
      const { id: note_id } = req.params;
      const user_id = req.user.id;
      const { title, content } = req.body;

      const note = await NotesService.updateNote(note_id, user_id, { title, content });
      sendSuccessResponse(res, note, 'Note updated successfully');
    } catch (error) {
      sendErrorResponse(res, error, 'Failed to update note');
    }
  },

  // Delete a note
  deleteNote: async (req, res) => {
    try {
      const { id: note_id } = req.params;
      const user_id = req.user.id;

      await NotesService.deleteNote(note_id, user_id);
      sendSuccessResponse(res, null, 'Note deleted successfully');
    } catch (error) {
      sendErrorResponse(res, error, 'Failed to delete note');
    }
  },
};
