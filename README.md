# Smart Resume Builder with AI Suggestions

A modern, full-stack resume builder application that helps users create professional resumes with AI-powered suggestions for improvement.

## Features

- 📝 **Interactive Resume Builder**: Comprehensive form-based interface for entering resume data
- 🤖 **AI-Powered Suggestions**: Get intelligent feedback on your resume using OpenAI GPT-3.5
- 📄 **PDF Export**: Download your resume as a professionally formatted PDF
- 👁️ **Live Preview**: See how your resume looks before exporting
- 💾 **Save & Load**: Store multiple resumes and load them anytime
- 🎨 **Modern UI**: Beautiful, responsive design built with Tailwind CSS
- 🖨️ **Print-Friendly**: Optimized preview mode for printing

## Tech Stack

### Frontend
- React.js 18
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express.js
- MySQL with mysql2
- OpenAI API (GPT-3.5)
- PDFKit for PDF generation

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MySQL (local installation or cloud MySQL service)
- OpenAI API key (get one from [OpenAI Platform](https://platform.openai.com/api-keys))

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd pythonproject
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=resume_builder
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: 
- The database will be created automatically if it doesn't exist
- Make sure MySQL is running before starting the server

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Start MySQL

If using local MySQL:

```bash
# On Windows (if installed as service, it starts automatically)
# Or start MySQL service from Services panel

# On macOS (with Homebrew)
brew services start mysql

# On Linux
sudo systemctl start mysql
# or
sudo service mysql start
```

### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## Usage

1. **Fill in Your Resume**: Use the "Edit" tab to enter your personal information, experience, education, skills, and projects.

2. **Preview Your Resume**: Switch to the "Preview" tab to see how your resume looks. You can print it directly from the browser.

3. **Get AI Suggestions**: 
   - Click on the "AI Suggestions" tab
   - Select a section (Summary, Experience, Skills) or get overall feedback
   - Review the AI-powered suggestions to improve your resume

4. **Save Your Resume**: Click the "Save" button to store your resume in the database.

5. **Load Saved Resumes**: Use the sidebar to load previously saved resumes.

6. **Export as PDF**: Click "Export PDF" to download your resume as a PDF file.

## Project Structure

```
pythonproject/
├── backend/
│   ├── config/
│   │   └── database.js        # MySQL connection and initialization
│   ├── models/
│   │   └── Resume.js          # Resume model with MySQL queries
│   ├── routes/
│   │   ├── resumes.js         # CRUD operations
│   │   ├── ai.js              # AI suggestions endpoints
│   │   └── pdf.js             # PDF generation
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env                   # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeForm.js      # Form component
│   │   │   ├── ResumePreview.js   # Preview component
│   │   │   └── AISuggestions.js   # AI suggestions component
│   │   ├── App.js                 # Main app component
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## API Endpoints

### Resumes
- `GET /api/resumes` - Get all resumes
- `GET /api/resumes/:id` - Get a specific resume
- `POST /api/resumes` - Create a new resume
- `PUT /api/resumes/:id` - Update a resume
- `DELETE /api/resumes/:id` - Delete a resume

### AI Suggestions
- `POST /api/ai/suggestions` - Get suggestions for a specific section
- `POST /api/ai/feedback` - Get overall resume feedback

### PDF Export
- `POST /api/pdf/generate` - Generate and download PDF

## Configuration

### OpenAI API Setup

1. Sign up for an account at [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API Keys section
3. Create a new API key
4. Copy the key and add it to your `backend/.env` file

**Note**: The free tier of OpenAI API has usage limits. Monitor your usage on the OpenAI dashboard.

### MySQL Setup

#### Local MySQL
1. Install MySQL from [mysql.com](https://dev.mysql.com/downloads/mysql/)
2. Start MySQL service
3. Create a database user (or use root) and note the password
4. Update the `.env` file with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=resume_builder
   ```
5. The database and tables will be created automatically on first run

#### Cloud MySQL (Alternative)
1. Use services like:
   - [PlanetScale](https://planetscale.com/) (free tier available)
   - [AWS RDS](https://aws.amazon.com/rds/)
   - [Google Cloud SQL](https://cloud.google.com/sql)
   - [Azure Database for MySQL](https://azure.microsoft.com/en-us/products/mysql)
2. Get your connection details and update `.env` accordingly

## Troubleshooting

### Backend Issues

- **MySQL Connection Error**: Ensure MySQL is running and credentials in `.env` are correct
- **Database Creation Error**: Make sure the MySQL user has CREATE DATABASE privileges
- **OpenAI API Error**: Verify your API key is correct and you have credits available
- **Port Already in Use**: Change the PORT in `.env` file

### Frontend Issues

- **Cannot Connect to Backend**: Ensure backend is running on port 5000
- **CORS Errors**: Backend CORS is configured to allow all origins in development

## Future Enhancements

- [ ] Resume templates/themes
- [ ] Multiple resume formats (Chronological, Functional, Combination)
- [ ] Resume sharing via unique links
- [ ] ATS compatibility checker
- [ ] Cover letter generator
- [ ] Resume analytics and insights

## License

This project is open source and available under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome!

## Support

For support, please open an issue in the repository or contact the development team.

