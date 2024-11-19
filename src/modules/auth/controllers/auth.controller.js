const { sendSuccessResponse, sendErrorResponse } = require('../../../utils/response.util');
const { hashPassword, comparePassword } = require('../../../utils/hash.util'); // Import comparePassword
const UserService = require('../services/auth.services');
const { generateToken } = require('../../../utils/jwt.util'); // Jika Anda juga membutuhkan token JWT

module.exports = {
  register: async (req, res) => {
    try {
      const { first_name, last_name, username, email, password, confirmPassword } = req.body;

      // Validasi jika password dan confirmPassword tidak sama
      if (password !== confirmPassword) {
        return sendErrorResponse(res, null, 'Passwords do not match');
      }

      // Hash password sebelum disimpan
      const hashedPassword = await hashPassword(password);
      
      // Memanggil fungsi createUser dari UserService
      const user = await UserService.createUser(first_name, last_name, username, email, hashedPassword);

      sendSuccessResponse(res, {
        user: {
          id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email
        }
      }, 'User registered successfully');
    } catch (error) {
      sendErrorResponse(res, error, 'Registration failed');
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.findUserByEmail(email);

      if (!user) {
        return sendErrorResponse(res, null, 'Invalid credentials');
      }

      // Verifikasi password menggunakan comparePassword
      const isPasswordValid = await comparePassword(password, user.password); // Gunakan fungsi comparePassword
      if (!isPasswordValid) {
        return sendErrorResponse(res, null, 'Invalid credentials');
      }

      // Jika password valid, buat token
      const token = generateToken(user.user_id);

      sendSuccessResponse(res, {
        token: token,
        user: {
          id: user.user_id,
          name: `${user.first_name} ${user.last_name}`
        }
      }, 'Login successful');
    } catch (error) {
      sendErrorResponse(res, error, 'Login failed');
    }
  },
};
