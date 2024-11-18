const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); // Pastikan Anda sudah mengkonfigurasi koneksi DB

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Title is required' },
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Content is required' },
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Pastikan Anda sudah memiliki model User yang terkait
      key: 'id',
    },
  },
}, {
  timestamps: true,  // Menyimpan waktu pembuatan dan pembaruan catatan
});

// Sinkronisasi dengan database
Note.sync();

module.exports = Note;
