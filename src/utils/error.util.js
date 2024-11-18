class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // Untuk membedakan error sistem dan aplikasi
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  /**
   * Middleware untuk menangani error global.
   * @param {Object} err - Objek error.
   * @param {Object} req - Objek request Express.
   * @param {Object} res - Objek response Express.
   * @param {Function} next - Fungsi middleware berikutnya.
   */
  const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      status: 'error',
      message,
    });
  };
  
  module.exports = {
    AppError,
    globalErrorHandler,
  };
  