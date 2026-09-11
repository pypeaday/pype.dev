---
date: 2025-07-16 20:33:25
templateKey: blog-post
title: gotify cli for notifying me of nextcloud uploads
published: True
tags:
  - nextcloud
  - tech
  - notifications
  - nextcloud
  - gotify
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717135448_f247e916.png"
---

# The Ask

I was looking for a way to get notified from nextcloud when files were uploaded
to a certain directory. This is because the upload is very spotty due to the
physical environment of where the nextcloud client is, and once a file shows up
I have a job to do. So I was hoping nextcloud had an easy way to say "if file
shows up in X folder, notify me" but I can't find it...

## Solution 2

Since I already use gotify and they provide a [DOPE
CLI](https://github.com/gotify/cli) we can write a little bash script to work
at the filesystem level rather than the nextcloud level.

## Permissions

We'll need to make sure the user running this script has all the right read
permissions... In my exact case the file upload happens in a group folder,
which is easily found on the filesystem in the Nextcloud volume at
`.../data/__groupfolders/{id}/{rest of path}`. This was owned by `www-data` on
the host, see
[[add-yourself-to-www-data-to-view-your-nextcloud-data-on-the-filesystem]] if
you want but a simple `usermod -aG www-data <me>` does the trick.

## The Script

With a little AI magic to spruce up the messaging, the script basically looks like this:

```bash
#!/bin/bash

# Script to monitor sermon directory using gotify watch
# Used with a systemd service or standalone
# Can run in local or remote (SSH) mode

# Configuration

# Target directory to monitor
DIR_PATH="/path/to/watch"

# Mode: Set to "ssh" or "local"
# If ssh, will connect to SSH_HOST as SSH_USER to monitor the directory
# If local, will monitor the directory directly on this machine
MODE="ssh"

# Remote SSH settings (only used if MODE="ssh")
SSH_USER="youruser"
SSH_HOST="yourserver"

# Log settings
LOG_DIR="$HOME/.local/state/sermon-monitor"
LOG_FILE="$LOG_DIR/sermon-monitor.log"
MAX_LOG_SIZE_KB=1024 # 1MB max log size

# Create log directory if it doesn't exist
mkdir -p "$LOG_DIR" 2>/dev/null

# Create or truncate log file if it's too large
if [ -f "$LOG_FILE" ] && [ $(stat -c%s "$LOG_FILE" 2>/dev/null || echo 0) -gt $((MAX_LOG_SIZE_KB * 1024)) ]; then
  # Keep the last 20 lines when rotating
  tail -n 20 "$LOG_FILE" >"${LOG_FILE}.tmp" 2>/dev/null && mv "${LOG_FILE}.tmp" "$LOG_FILE" 2>/dev/null
  echo "$(date '+%Y-%m-%d %H:%M:%S') - Log file rotated due to size limit" >>"$LOG_FILE"
fi

# Ensure log file exists
touch "$LOG_FILE" 2>/dev/null

# Log function
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Create a temp file to store the previous state
TEMP_DIR="/tmp/gotify-watcher"
PREV_STATE_FILE="$TEMP_DIR/previous_state.txt"
mkdir -p "$TEMP_DIR" 2>/dev/null || true

# Function to get directory listing based on mode
get_directory_listing() {
  if [ "$MODE" = "ssh" ]; then
    # Remote mode - use SSH
    ssh $SSH_USER@$SSH_HOST "ls -la '$DIR_PATH' | grep -v '^\.\.$' | grep -v '^\.$'" ||
      echo "Error: Failed to connect to $SSH_HOST"
  else
    # Local mode - direct access
    if [ -d "$DIR_PATH" ]; then
      ls -la "$DIR_PATH" | grep -v '^\.\.$' | grep -v '^\.$'
    else
      echo "Error: Directory $DIR_PATH does not exist locally"
    fi
  fi
}

# Removed unused function - was leftover from previous version

# Display startup message based on mode
if [ "$MODE" = "ssh" ]; then
  log "Starting sermon file monitor for $SSH_USER@$SSH_HOST:$DIR_PATH (SSH mode)"
else
  log "Starting sermon file monitor for $DIR_PATH (local mode)"
fi

# Run initial check to establish baseline
CURRENT_LISTING=$(get_directory_listing)
echo "$CURRENT_LISTING" >"$PREV_STATE_FILE"
log "Initial state captured. Watching for changes."

# Monitor continuously
while true; do
  # Sleep for 30 seconds between checks
  sleep 30

  # Get current listing
  CURRENT_LISTING=$(get_directory_listing)

  # Find new files by comparing with previous state
  NEW_FILES=$(diff --new-line-format="%L" --old-line-format="" --unchanged-line-format="" \
    "$PREV_STATE_FILE" <(echo "$CURRENT_LISTING") | grep -v "^total" | grep -v "^drwx")

  # If new files found, notify
  if [ -n "$NEW_FILES" ]; then
    # Filter out directories and system entries, keep only regular files
    FILE_ENTRIES=$(echo "$NEW_FILES" | grep -v "^d" | grep -v "^total" | grep -v "^\.$" | grep -v "^\.\.")

    # Count how many actual files (non-empty lines)
    NEW_COUNT=$(echo "$FILE_ENTRIES" | grep -v "^$" | wc -l)

    # Only proceed if we have actual files
    if [ "$NEW_COUNT" -gt 0 ]; then
      # Create notification message
      if [ "$NEW_COUNT" -eq 1 ]; then
        TITLE="New File Added"
        # Extract filename from listing line
        FILENAME=$(echo "$FILE_ENTRIES" | awk '{print $NF}')
        MESSAGE="New file detected: $FILENAME"
      else
        TITLE="New Files Added"
        # Format filenames only for readability
        FILELIST=$(echo "$FILE_ENTRIES" | awk '{print $NF}' | sort)
        MESSAGE="$NEW_COUNT new files detected:\n$FILELIST"
      fi

      # Send notification
      gotify push --title "$TITLE" "$MESSAGE"
      log "Notification sent for new files: $NEW_COUNT"
    fi

    # Update previous state
    echo "$CURRENT_LISTING" >"$PREV_STATE_FILE"
  fi
done

# If we get here, gotify watch has exited
log "gotify watch exited unexpectedly"
exit 1

```

### Credentials

As noted in the gotify repo - you can put the relevant credentials in a
`./cli.json` which is what I did since this is in a big repo of mine and that's
where the script executes from

```json
{
  "token": "yourToken",
  "url": "https://gotify.example.com",
  "defaultPriority": 6
}
```
