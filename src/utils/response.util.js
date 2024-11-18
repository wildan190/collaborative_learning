/**
 * Format untuk respons sukses.
 * @param {Object} res - Objek respons Express.
 * @param {number} code - Status kode HTTP.
 * @param {string} message - Pesan sukses.
 * @param {Object} data - Data tambahan.
 */
const successResponse = (res, code, message, data = {}) => {
    res.status(code).json({
      status: 'success',
      message,
      data,
    });
  };
  
  /**
   * Format untuk respons error.
   * @param {Object} res - Objek respons Express.
   * @param {number} code - Status kode HTTP.
   * @param {string} message - Pesan error.
   * @param {Object} error - Detail error tambahan.
   */
  const errorResponse = (res, code, message, error = {}) => {
    res.status(code).json({
      status: 'error',
      message,
      error,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  