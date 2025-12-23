# MySQL Setup Guide

## Quick Fix for "Access Denied" Error

The error means MySQL requires a password for the root user. Here are your options:

### Option 1: Find Your MySQL Password

If you installed MySQL with a password, you need to add it to the `.env` file:

1. Open `backend/.env` file
2. Update the `DB_PASSWORD` line with your MySQL password:
   ```env
   DB_PASSWORD=your_actual_mysql_password
   ```

### Option 2: Reset MySQL Root Password (if you forgot it)

**Windows:**
1. Stop MySQL service
2. Create a text file `mysql-init.txt` with:
   ```
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
   ```
3. Start MySQL with:
   ```bash
   mysqld --init-file=C:/path/to/mysql-init.txt
   ```
4. Update `.env` with the new password

### Option 3: Create a New MySQL User (Recommended)

1. Open MySQL command line or MySQL Workbench
2. Run these commands:
   ```sql
   CREATE USER 'resume_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON resume_builder.* TO 'resume_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
3. Update `.env`:
   ```env
   DB_USER=resume_user
   DB_PASSWORD=your_password
   ```

### Option 4: Use MySQL Without Password (Not Recommended for Production)

If you want to use root without password:

1. Open MySQL command line
2. Run:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY '';
   FLUSH PRIVILEGES;
   ```
3. Keep `DB_PASSWORD=` empty in `.env`

## Check Your MySQL Installation

**Test MySQL connection:**
```bash
mysql -u root -p
```

If this works, use the same password in your `.env` file.

## Common MySQL Default Passwords

- **XAMPP**: Usually empty (no password)
- **WAMP**: Usually empty (no password)
- **Standalone MySQL**: The password you set during installation
- **MySQL via Homebrew (Mac)**: Usually empty initially

## Still Having Issues?

1. Make sure MySQL service is running
2. Check if MySQL is installed: `mysql --version`
3. Try connecting manually: `mysql -u root -p`
4. If you can't connect, MySQL might not be installed or running





