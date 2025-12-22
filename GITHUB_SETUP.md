# How to Upload Project to GitHub

## Step 1: Create a GitHub Account
1. Go to https://github.com
2. Sign up for a free account if you don't have one

## Step 2: Create a New Repository
1. Click the "+" icon in the top right corner
2. Select "New repository"
3. Name your repository (e.g., "smart-resume-builder")
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 3: Initialize Git in Your Project

Open PowerShell/Terminal in your project folder and run:

```powershell
# Navigate to your project
cd C:\Users\vaish\Desktop\pythonproject

# Initialize git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Smart Resume Builder with AI Suggestions"
```

## Step 4: Connect to GitHub and Push

```powershell
# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example:**
```powershell
git remote add origin https://github.com/vaish/smart-resume-builder.git
git push -u origin main
```

## Step 5: Verify Upload
1. Go to your GitHub repository page
2. You should see all your files uploaded

## Important: Before Pushing

### Create/Update .gitignore

Make sure your `.gitignore` file includes:

```
# Dependencies
node_modules/
backend/node_modules/
frontend/node_modules/

# Environment variables
.env
backend/.env
frontend/.env

# Build files
build/
dist/
*.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Python (if any)
__pycache__/
*.pyc
```

### Remove Sensitive Data

**IMPORTANT:** Before pushing, make sure:
- ✅ `.env` files are in `.gitignore`
- ✅ No API keys are hardcoded in files
- ✅ Database passwords are not committed
- ✅ Only `.env.example` files are committed (without real values)

## Future Updates

To update your GitHub repository after making changes:

```powershell
# Add changed files
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## Troubleshooting

### If you get authentication error:
```powershell
# Use GitHub Personal Access Token instead of password
# Or use GitHub Desktop app for easier authentication
```

### If files are too large:
```powershell
# Remove node_modules before committing
# They can be reinstalled with npm install
```

### To check what will be committed:
```powershell
git status
```

## Alternative: Using GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. Click "File" → "Add Local Repository"
4. Select your project folder
5. Click "Publish repository"
6. Choose name and visibility
7. Click "Publish repository"

This is easier for beginners!

