const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Konfigurasi koneksi database PostgreSQL
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: false,  // Matikan logging SQL query
  define: {
    freezeTableName: true,  // Mencegah Sequelize mengubah nama tabel menjadi plural
    underscored: true       // Gunakan format snake_case untuk nama kolom
  }
});

// Export koneksi sequelize
module.exports = sequelize;
