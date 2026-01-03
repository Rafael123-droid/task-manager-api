const express = require('express');
const cors = require('cors');

const userRoutes = require(__dirname + '/routes/userRoutes');
const taskRoutes = require(__dirname + '/routes/taskRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

module.exports = app;
