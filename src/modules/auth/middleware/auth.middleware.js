const jwt = require('jsonwebtoken');
const UserService = require('../services/auth.services');
const { sendErrorResponse } = require('../../../utils/response.util');

module.exports = {
  authenticate: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendErrorResponse(res, null, 'No token provided', 401);
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token

      // Cari pengguna berdasarkan `userId` dari token
      const user = await UserService.findUserById(decoded.userId);
      if (!user) {
        return sendErrorResponse(res, null, 'User not found', 404);
      }

      // Tambahkan user ke `req.user`
      req.user = {
        id: user.user_id, // Gunakan kolom yang sesuai di database
        name: user.first_name, // Sesuaikan dengan atribut user
        email: user.email,
      };

      next();
    } catch (error) {
      return sendErrorResponse(res, error, 'Unauthorized', 401);
    }
  },
};
