const pool = require('../config/db');

exports.getAll = async (userId) => {
  let sql = 'SELECT * FROM tasks';
  let params = [];

  if (userId) {
    sql += ' WHERE user_id = ?';
    params.push(userId);
  }

  const [rows] = await pool.query(sql, params);
  return rows;
};

exports.create = async (data) => {
  const { user_id, title, description, status, due_date } = data;

  const [result] = await pool.query(
    `INSERT INTO tasks (user_id, title, description, status, due_date)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, title, description || null, status || 'pending', due_date || null]
  );

  return result.insertId;
};

exports.update = async (id, data) => {
  const fields = [];
  const values = [];

  if (data.title !== undefined) {
    fields.push('title = ?');
    values.push(data.title);
  }
  if (data.status !== undefined) {
    fields.push('status = ?');
    values.push(data.status);
  }

  if (fields.length === 0) return;

  const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);

  await pool.query(sql, values);
};


exports.remove = async (id) => {
  await pool.query('DELETE FROM tasks WHERE id=?', [id]);
};
