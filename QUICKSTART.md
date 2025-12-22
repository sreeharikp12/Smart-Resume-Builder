# Quick Start Guide

## Step-by-Step Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

**Backend (.env file in backend/):**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=resume_builder
OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Frontend (.env file in frontend/ - optional):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start MySQL

**Windows:**
```bash
# If MySQL is installed as a service, it should start automatically
# Or start from Services panel (services.msc)
```

**macOS (with Homebrew):**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
# or
sudo service mysql start
```

**Or use Cloud MySQL:**
- Use services like PlanetScale (free tier), AWS RDS, etc.
- Get connection details and update .env file

### 4. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy the key and add it to `backend/.env` as `OPENAI_API_KEY`

**Note:** OpenAI offers free credits for new users. Check your usage at https://platform.openai.com/usage

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server should start on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App should open in browser at http://localhost:3000
```

### 6. Start Building Your Resume!

1. Fill in your information in the "Edit" tab
2. Click "Save" to store your resume
3. Switch to "Preview" to see how it looks
4. Use "AI Suggestions" to get improvement tips
5. Click "Export PDF" to download your resume

## Troubleshooting

**Backend won't start:**
- Check if MySQL is running
- Verify .env file exists and has correct MySQL credentials
- Check if port 5000 is available
- Ensure MySQL user has CREATE DATABASE privileges

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in frontend/.env

**AI Suggestions not working:**
- Verify OPENAI_API_KEY is set correctly
- Check if you have API credits available
- Look at backend console for error messages

**PDF export not working:**
- Check browser console for errors
- Ensure backend is running
- Try a different browser

## Need Help?

- Check the main README.md for detailed documentation
- Review error messages in browser console (F12) and terminal
- Ensure all dependencies are installed correctly

