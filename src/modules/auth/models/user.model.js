const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); // Import koneksi sequelize

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Pastikan username unik
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Pastikan email unik
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users', // Nama tabel di database
  timestamps: true,   // Menambahkan created_at dan updated_at secara otomatis
});

module.exports = User;
