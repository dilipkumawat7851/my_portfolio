const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool, initializeDB } = require('./config/db');

const app = express();

// Middleware
app.use(cors()); // Allow all origins in development to prevent CORS errors
app.use(express.json());

// Initialize Database
initializeDB();

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = 'INSERT INTO `' + process.env.DB_NAME + '`.`contacts` (name, email, message) VALUES (?, ?, ?)';
    const [result] = await pool.query(query, [name, email, message]);

    console.log('New message saved with ID:', result.insertId);
    return res.status(200).json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
