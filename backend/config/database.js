const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'resume_builder',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully');
    connection.release();
    return true;
  } catch (error) {
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('MySQL connection error: Access denied. Check your .env file for correct DB_PASSWORD');
    } else {
      console.error('MySQL connection error:', error.message);
    }
    return false;
  }
}

// Initialize database and tables
async function initializeDatabase() {
  try {
    // Create database if it doesn't exist
    const tempConfig = { ...dbConfig };
    delete tempConfig.database;
    const tempPool = mysql.createPool(tempConfig);
    
    await tempPool.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    await tempPool.end();
    
    // Create tables (now that database exists, pool can connect)
    await createTables();
    console.log('Database initialized successfully');
  } catch (error) {
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n❌ MySQL Access Denied Error!');
      console.error('The MySQL password is incorrect or missing.');
      console.error('\n📝 To fix this:');
      console.error('1. Open backend/.env file');
      console.error('2. Update DB_PASSWORD with your MySQL root password');
      console.error('3. If you don\'t know your password, see MYSQL_SETUP.md for help');
      console.error('\n💡 Common solutions:');
      console.error('   - If using XAMPP/WAMP: password is usually empty (leave DB_PASSWORD=)');
      console.error('   - Try: mysql -u root -p (to test your password)');
      console.error('   - See MYSQL_SETUP.md for detailed instructions\n');
    }
    console.error('Database initialization error:', error.message);
    throw error;
  }
}

async function createTables() {
  const connection = await pool.getConnection();
  
  try {
    // Create resumes table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS resumes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) DEFAULT '',
        personal_info JSON,
        summary TEXT,
        experience JSON,
        education JSON,
        skills JSON,
        projects JSON,
        certifications JSON,
        languages JSON,
        template VARCHAR(10) DEFAULT '1',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    // Add template and title columns if they don't exist (for existing databases)
    try {
      const [columns] = await connection.execute(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'resumes' 
        AND COLUMN_NAME IN ('template', 'title')
      `);
      
      const existingColumns = columns.map(col => col.COLUMN_NAME);
      
      if (!existingColumns.includes('template')) {
        await connection.execute(`
          ALTER TABLE resumes 
          ADD COLUMN template VARCHAR(10) DEFAULT '1'
        `);
        console.log('Template column added to existing table');
      }
      
      if (!existingColumns.includes('title')) {
        await connection.execute(`
          ALTER TABLE resumes 
          ADD COLUMN title VARCHAR(255) DEFAULT ''
        `);
        console.log('Title column added to existing table');
      }
    } catch (error) {
      console.log('Note: Column migration:', error.message);
    }
    
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error.message);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  pool,
  testConnection,
  initializeDatabase
};

