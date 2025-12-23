const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('\n=== Resume Builder Backend Setup ===\n');
  
  const envPath = path.join(__dirname, '.env');
  
  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    const overwrite = await question('.env file already exists. Overwrite? (y/n): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
  }
  
  console.log('Please provide the following information:\n');
  
  const port = await question('Server Port (default: 5000): ') || '5000';
  const dbHost = await question('MySQL Host (default: localhost): ') || 'localhost';
  const dbUser = await question('MySQL Username (default: root): ') || 'root';
  const dbPassword = await question('MySQL Password (press Enter if no password): ') || '';
  const dbName = await question('Database Name (default: resume_builder): ') || 'resume_builder';
  const openaiKey = await question('OpenAI API Key (optional, can add later): ') || '';
  
  const envContent = `PORT=${port}
DB_HOST=${dbHost}
DB_USER=${dbUser}
DB_PASSWORD=${dbPassword}
DB_NAME=${dbName}
OPENAI_API_KEY=${openaiKey}
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('\n✅ .env file created successfully!');
  console.log('\n📝 File location: ' + envPath);
  console.log('\n⚠️  Note: If you need to update MySQL password later, edit the .env file.');
  console.log('\n🚀 You can now run: npm start\n');
  
  rl.close();
}

setup().catch(err => {
  console.error('Setup error:', err);
  rl.close();
  process.exit(1);
});





