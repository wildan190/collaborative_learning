const bcrypt = require('bcryptjs'); // Pastikan bcryptjs sudah diinstall

// Fungsi untuk mem-hash password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
};

// Fungsi untuk membandingkan password yang dimasukkan dengan password yang sudah di-hash
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch; // Mengembalikan true jika password cocok, false jika tidak
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message);
  }
};

module.exports = { hashPassword, comparePassword };
