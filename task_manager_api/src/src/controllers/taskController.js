const Task = require('../models/taskModel');

exports.getTasks = async (req, res) => {
  try {
    const { user_id } = req.query;
    const tasks = await Task.getAll(user_id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { user_id, title, status } = req.body;

    if (!user_id || !title) {
      return res.status(400).json({ message: 'user_id and title required' });
    }

    if (status && status !== 'pending' && status !== 'done') {
      return res.status(400).json({ message: "status must be 'pending' or 'done'" });
    }

    const id = await Task.create(req.body);
    res.status(201).json({ id, message: 'Created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { status } = req.body;

    if (status && status !== 'pending' && status !== 'done') {
      return res.status(400).json({ message: "status must be 'pending' or 'done'" });
    }

    await Task.update(req.params.id, req.body);
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.remove(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
