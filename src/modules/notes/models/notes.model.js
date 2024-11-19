const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Note = sequelize.define(
  'Note',
  {
    note_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'notes', // Nama tabel di database
    timestamps: false, // Disable default Sequelize timestamps
    underscored: true, // Gunakan snake_case
  }
);

module.exports = Note;
