// Script to add title column to existing database
const mysql = require('mysql2/promise');
require('dotenv').config();

async function addTitleColumn() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'resume_builder'
  });

  try {
    // Check if column exists
    const [columns] = await pool.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'resumes' 
      AND COLUMN_NAME = 'title'
    `);

    if (columns.length === 0) {
      console.log('Adding title column to resumes table...');
      await pool.execute(`
        ALTER TABLE resumes 
        ADD COLUMN title VARCHAR(255) DEFAULT ''
      `);
      console.log('✅ Title column added successfully!');
      
      // Update existing resumes with auto-generated titles
      const [resumes] = await pool.execute('SELECT id, personal_info, created_at FROM resumes WHERE title IS NULL OR title = ""');
      
      for (const resume of resumes) {
        let title = '';
        try {
          let personalInfo = {};
          if (resume.personal_info) {
            if (typeof resume.personal_info === 'string') {
              personalInfo = JSON.parse(resume.personal_info);
            } else {
              personalInfo = resume.personal_info;
            }
          }
          
          const fullName = personalInfo?.fullName?.trim();
          if (fullName) {
            title = `${fullName}'s Resume`;
          } else {
            const date = new Date(resume.created_at);
            title = `Resume ${date.toLocaleDateString()}`;
          }
          
          await pool.execute('UPDATE resumes SET title = ? WHERE id = ?', [title, resume.id]);
          console.log(`Updated resume ${resume.id} with title: ${title}`);
        } catch (error) {
          console.error(`Error updating resume ${resume.id}:`, error.message);
          // Set a default title if parsing fails
          const date = new Date(resume.created_at);
          const defaultTitle = `Resume ${date.toLocaleDateString()}`;
          await pool.execute('UPDATE resumes SET title = ? WHERE id = ?', [defaultTitle, resume.id]);
        }
      }
      
      console.log('✅ All existing resumes updated with titles!');
    } else {
      console.log('✅ Title column already exists');
    }

    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
    await pool.end();
    process.exit(1);
  }
}

addTitleColumn();

