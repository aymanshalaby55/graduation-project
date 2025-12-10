#!/bin/bash

CONFIG_FILE="$HOME/.config/rclone/rclone.conf"
LOG_FILE="/var/backup.log"
BACKUP_DIR="/var/Backup"

# Ensure necessary directories and files exist with proper permissions
mkdir -p "$(dirname "$LOG_FILE")" 2>/dev/null || sudo mkdir -p "$(dirname "$LOG_FILE")"
mkdir -p "$BACKUP_DIR" 2>/dev/null || sudo mkdir -p "$BACKUP_DIR"

# Ensure log file exists and is writable
if [ ! -f "$LOG_FILE" ]; then
    sudo touch "$LOG_FILE" 2>/dev/null || touch "$LOG_FILE" 2>/dev/null
fi
sudo chmod 666 "$LOG_FILE" 2>/dev/null || chmod 666 "$LOG_FILE" 2>/dev/null

# Ensure backup directory is writable
sudo chown $USER:$USER "$BACKUP_DIR" 2>/dev/null || chown $USER:$USER "$BACKUP_DIR" 2>/dev/null
sudo chmod 755 "$BACKUP_DIR" 2>/dev/null || chmod 755 "$BACKUP_DIR" 2>/dev/null

#Functions

# availabe options for the script
check_options() {
    case "$1" in
        --login|-l)
            echo "Setting up rclone for Google Drive..."
            rclone config create gdrive drive
            
            # Verify it was created
            if rclone listremotes | grep -q "^gdrive:$"; then
                echo "Remote configured successfully"
            else
                echo "Failed to configure remote"
                exit 1
            fi
            exit 0
            ;;
        --logs|-L)
            if [ -f "$LOG_FILE" ]; then
                cat "$LOG_FILE"
            else
                echo "No log file found at $LOG_FILE"
            fi
            exit 0
            ;;
        --help|-h)
            if [ -f "$HOME/.local/share/backup/help.txt" ]; then
                cat "$HOME/.local/share/backup/help.txt"
            else
                echo "Help file not found"
            fi
            exit 0
            ;;
        -*|--*)
            # Unknown option starting with - or --
            echo "Error: Unknown option '$1'"
            echo ""
            if [ -f "$HOME/.local/share/backup/help.txt" ]; then
                cat "$HOME/.local/share/backup/help.txt"
            else
                echo "Help file not found"
            fi
            exit 1
            ;;
        *)
            # No special option, continue with normal backup
            ;;
    esac
}

#archived and compressed using tar 
compress_files(){
    mkdir -p "$BACKUP_DIR" 
    local basename=$(basename "$1")
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local output="$BACKUP_DIR/${basename}_${timestamp}"
    local source="$1"
    
    # Check if source exists
    if [ ! -e "$source" ]; then
        echo "Error: Source '$source' does not exist" >&2
        return 1
    fi
    
    # Check if source is readable
    if [ ! -r "$source" ]; then
        echo "Error: Source '$source' is not readable" >&2
        return 1
    fi

    tar -czf "${output}.tar.gz" -C "$(dirname "$source")" "$(basename "$source")" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "File ${output}.tar.gz Compressed Successfully"
        echo "$output.tar.gz"  # Return the compressed file path
        return 0
    else
        echo "Error: Compression failed for '$source'" >&2
        return 1
    fi
}

perform_backup() {
    local source_path="$1"
    
    if [ -z "$source_path" ]; then
        echo "Error: No source path provided"
        exit 1
    fi
    
    # Verify the source path exists before attempting backup
    if [ ! -e "$source_path" ]; then
        echo "Error: Backup source '$source_path' does not exist"
        exit 1
    fi
    
    echo "Starting backup of $source_path..."
    rclone copy "$source_path" gdrive:Backups --progress > "$LOG_FILE" 2>&1
    
    if [ $? -eq 0 ]; then
        echo "Backup successful: $(date)" >> "$LOG_FILE"
        echo "Backup completed successfully"
        
        # Upload log file to Google Drive
        rclone copy "$LOG_FILE" gdrive:Backups
    else
        echo "Backup Failed: $(date)" >> "$LOG_FILE"
        echo "Backup failed - check $LOG_FILE for details"
        
        # Upload log file to Google Drive even on failure
        rclone copy "$LOG_FILE" gdrive:Backups
        exit 1
    fi
}

# make 


# Run the backup
check_options $1

# Get the last argument (the file/directory to backup)
source_to_backup="${@: -1}"

# Validate that a source was provided
if [ -z "$source_to_backup" ]; then
    echo "Error: No file or directory specified for backup"
    echo "Usage: $0 [options] <file_or_directory>"
    exit 1
fi

# Check if the source exists before attempting compression
if [ ! -e "$source_to_backup" ]; then
    echo "Error: Source '$source_to_backup' does not exist"
    exit 1
fi

# Compress files and capture the output
compressed_file=$(compress_files "$source_to_backup")

# Check if compression was successful
if [ $? -ne 0 ]; then
    echo "Backup aborted due to compression failure"
    exit 1
fi

# Only proceed with backup if compression succeeded
perform_backup "$BACKUP_DIR"


# clean up backup folder contents (not the directory itself)
rm -rf "$BACKUP_DIR"/*