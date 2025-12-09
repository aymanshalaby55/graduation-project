# Backup Script with Rclone

A bash-based backup utility that compresses files/directories and automatically uploads them to Google Drive using rclone.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Troubleshooting](#troubleshooting)
- [File Structure](#file-structure)
- [Important Notes](#important-notes)

## Features

- 🗜️ Automatic compression of files and directories using tar.gz
- ☁️ Automatic upload to Google Drive via rclone
- 📝 Detailed logging of all backup operations
- ⏰ Timestamped backup files for easy version tracking
- 🧹 Automatic cleanup of local backup files after upload
- 🔧 Easy installation with automated setup script

## Prerequisites

- Linux or macOS operating system
- Bash shell
- Internet connection for Google Drive uploads
- Sudo privileges (for installation)
- A Google account with Google Drive access

## Installation

### Step 1: Clone or Download the Repository

```bash
git clone https://github.com/aymanshalaby55/backupRcloneScript
cd backupRcloneScript
```

### Step 2: Run the Installation Script

```bash
chmod +x install.sh
sudo ./install.sh
```

The installation script will:
1. Check if rclone is installed (and install it if not)
2. Configure rclone with your Google Drive account
3. Make the backup script executable
4. Copy the script to `/usr/local/bin/backup` for system-wide access

## Configuration

### Default Paths

The script uses the following default paths (defined in `script.sh`):

- **Config File**: `$HOME/.config/rclone/rclone.conf`
- **Log File**: `/var/backup.log`
- **Temporary Backup Directory**: `/var/Backup`
- **Google Drive Remote**: `gdrive:Backups`

### Customizing Paths

To change these paths, edit the variables at the top of `script.sh`:

```bash
CONFIG_FILE="$HOME/.config/rclone/rclone.conf"
LOG_FILE="/var/backup.log"
BACKUP_DIR="/var/Backup"
```

### Customizing Google Drive Destination

In the `perform_backup()` function, change the destination:

```bash
rclone copy "$source_path" gdrive:YourFolder --progress > "$LOG_FILE" 2>&1
```

## Usage

### Basic Usage

After installation, you can run the backup command from anywhere:

```bash
backup /path/to/file/or/directory
```

Or if not installed globally:

```bash
./script.sh /path/to/file/or/directory
```

### Examples

**Backup a single file:**
```bash
backup /home/user/important_document.pdf
```

**Backup a directory:**
```bash
backup /home/user/Documents
```

**Backup your home directory:**
```bash
backup /home/user
```

### Expected Output

```
Starting backup of /path/to/source...
File /var/Backup/source_20251209_121646.tar.gz Compressed Successfully
[Progress bar showing upload status]
Backup completed successfully
```

## How It Works

### Workflow

1. **Compression Phase**:
   - Creates `/var/Backup` directory if it doesn't exist
   - Compresses the source file/directory with tar.gz
   - Names the archive with format: `{basename}_{timestamp}.tar.gz`
   - Example: `Documents_20251209_121646.tar.gz`

2. **Upload Phase**:
   - Uploads the compressed file to `gdrive:Backups` folder
   - Logs all progress to `/var/backup.log`
   - Shows real-time progress in the terminal

3. **Logging Phase**:
   - Records success/failure with timestamp
   - Uploads the log file to Google Drive
   - Provides error details if backup fails

4. **Cleanup Phase**:
   - Removes the local backup directory `/var/Backup`
   - Keeps only the remote copy on Google Drive

### Key Functions

#### `compress_files()`
- Compresses the specified source path
- Validates that the source exists
- Returns the path of the compressed file

#### `perform_backup()`
- Uploads files to Google Drive using rclone
- Logs all operations
- Handles success and failure scenarios

#### `check_rclone_auth()`
- Verifies rclone is configured with Google Drive
- Automatically sets up authentication if needed

## Troubleshooting

### Problem: "rclone: command not found"

**Solution**: Run the installation script again:
```bash
sudo ./install.sh
```

### Problem: "Remote 'gdrive' not configured"

**Solution**: Manually configure rclone:
```bash
rclone config
```
Follow the prompts to set up Google Drive (name it "gdrive").

### Problem: "Permission denied" when writing to /var

**Solution**: Either:
1. Run the script with sudo: `sudo backup /path/to/source`
2. Or change `BACKUP_DIR` in the script to a user-writable location like `$HOME/Backup`

### Problem: Backup fails with "Backup failed - check /var/backup.log"

**Solution**: Check the log file for details:
```bash
cat /var/backup.log
```

### Problem: Missing function error for `check_rclone_auth`

**Solution**: The function is defined in `install.sh` but called in `script.sh`. You need to either:
1. Run `install.sh` first, OR
2. Comment out line 61 in `script.sh` if rclone is already configured:
```bash
# check_rclone_auth
```

## File Structure

```
backupBashScript/
├── README.md          # This documentation file
├── install.sh         # Installation and setup script
├── script.sh          # Main backup script
└── backup.log         # Log file (created after first run)
```

## Important Notes

### ⚠️ Warning

1. **Local files are deleted**: The script removes `/var/Backup` after upload. Ensure your Google Drive upload succeeds before the cleanup.

2. **Requires sudo for /var**: By default, the script uses `/var/` which requires sudo privileges. Consider changing to a user directory if this is an issue.

3. **Internet required**: The backup will fail without an internet connection to Google Drive.

4. **Google Drive storage**: Ensure you have sufficient Google Drive storage space for your backups.

### 🔧 Known Issues

- The `check_rclone_auth` function is called in `script.sh` (line 61) but is only defined in `install.sh`. This will cause an error if you run `script.sh` directly without running `install.sh` first.

**Fix**: Either run `install.sh` first, or move the `check_rclone_auth()` function from `install.sh` to `script.sh`.

### 💡 Tips

1. **Schedule automatic backups**: Use cron to schedule regular backups:
   ```bash
   crontab -e
   # Add this line for daily backups at 2 AM:
   0 2 * * * /usr/local/bin/backup /home/user/Documents
   ```

2. **Check your backups**: List files on Google Drive:
   ```bash
   rclone ls gdrive:Backups
   ```

3. **Download a backup**: Restore files from Google Drive:
   ```bash
   rclone copy gdrive:Backups/filename.tar.gz ~/Downloads/
   ```

4. **Extract a backup**:
   ```bash
   tar -xzf backup_file.tar.gz
   ```

## License

This project is provided as-is for personal and commercial use.

## Support

For issues or questions, please check the [Troubleshooting](#troubleshooting) section or review the log file at `/var/backup.log`.

