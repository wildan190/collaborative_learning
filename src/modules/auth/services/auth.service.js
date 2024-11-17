const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const dotenv = require('dotenv');
dotenv.config();

// Fungsi untuk mengenkripsi password sebelum disimpan di database
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  return await bcrypt.hash(password, salt);
};

// Fungsi untuk memverifikasi password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Fungsi untuk membuat JWT token
const generateToken = (user) => {
  return jwt.sign(
    { user_id: user.user_id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

// Fungsi untuk registrasi pengguna baru
const registerUser = async (userData) => {
  const { username, email, password, first_name, last_name, role } = userData;

  // Periksa apakah email atau username sudah terdaftar
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('Email sudah terdaftar.');

  // Hash password dan simpan data pengguna
  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    first_name,
    last_name,
    role
  });

  return user;
};

// Fungsi untuk login pengguna
const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Email atau password salah.');

  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) throw new Error('Email atau password salah.');

  const token = generateToken(user);

  return { user, token };
};

module.exports = {
  registerUser,
  loginUser
};
