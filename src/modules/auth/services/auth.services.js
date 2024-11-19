const User = require("../models/user.model"); // Pastikan model ini diimport

module.exports = {
  // Fungsi untuk membuat user baru
  createUser: async (first_name, last_name, username, email, password) => {
    try {
      // Membuat user baru di database
      const user = await User.create({
        first_name,
        last_name,
        username,
        email,
        password,
      });

      return user; // Mengembalikan data user yang baru dibuat
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  },

  findUserById: async (userId) => {
    try {
      const user = await User.findOne({ where: { user_id: userId } });
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  },

  // Fungsi untuk mencari user berdasarkan email
  findUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  },
};
