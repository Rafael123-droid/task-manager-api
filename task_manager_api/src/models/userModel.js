const pool = require('../config/db');

exports.getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};

exports.create = async (name, email) => {
  const [result] = await pool.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  return result.insertId;
};
