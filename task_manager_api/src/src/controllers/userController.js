const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email required' });
    }

    const id = await User.create(name, email);
    res.status(201).json({ id, name, email });
  } catch (err) {
    // handle duplicate email nicely
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: err.message });
  }
};
