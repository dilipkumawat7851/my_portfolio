const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const initializeDB = async () => {
  try {
    // Connect to MySQL server first (without database specified) to create the DB if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.end();

    // Now update pool to use the database
    pool.pool.config.connectionConfig.database = process.env.DB_NAME;

    // Create the contacts table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS \`${process.env.DB_NAME}\`.\`contacts\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.query(createTableQuery);
    console.log('MySQL Database connected and tables ensured.');
  } catch (error) {
    console.error('MySQL Database connection failed:', error.message);
  }
};

module.exports = { pool, initializeDB };
