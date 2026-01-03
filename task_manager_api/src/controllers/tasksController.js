const pool = require('../config/db');

exports.getTasks = async (req, res) => {
  try {
    const { user_id } = req.query;
    let sql = 'SELECT * FROM tasks';
    let params = [];

    if (user_id) {
      sql += ' WHERE user_id = ?';
      params.push(user_id);
    }

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { user_id, title } = req.body;

    if (!user_id || !title) {
      return res.status(400).json({ message: 'user_id and title are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO tasks (user_id, title, status) VALUES (?, ?, ?)',
      [user_id, title, 'pending']
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query('UPDATE tasks SET status=? WHERE id=?', [status, id]);
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id=?', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
