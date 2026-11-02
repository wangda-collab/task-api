require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Catch any unhandled promise rejections or uncaught errors
process.on('uncaughtException', (err) => {
  console.error('CRITICAL UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
});

const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Task API is online!' });
});

app.use('/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error('Express Error Handler:', err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Prevent Node from exiting prematurely
process.stdin.resume();
