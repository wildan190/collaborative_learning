module.exports = {
    sendSuccessResponse: (res, data, message = 'Success') => {
      return res.status(200).json({
        success: true,
        data: data,
        message: message
      });
    },
  
    sendErrorResponse: (res, error, message = 'Error') => {
      // Jika error adalah array (misalnya validasi error)
      if (Array.isArray(error)) {
        return res.status(400).json({
          success: false,
          errors: error,  // Menampilkan error detail jika ada
          message: message
        });
      }
  
      // Jika error adalah object (misalnya error dari service/database)
      return res.status(500).json({
        success: false,
        error: error.message || error,  // Menampilkan pesan error dari exception
        message: message
      });
    },
  };
  