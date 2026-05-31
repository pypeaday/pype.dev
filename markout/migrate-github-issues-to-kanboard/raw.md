---
date: 2025-08-07 14:43:27
templateKey: til
title: Migrate Github Issues to Kanboard
published: True
tags:
  - kanboard
  - til
  - tech
---

I am working on shifting everything, or as much as I reasonably can, related to
dev for myself to on-prem, including git and CI/CD. So for Quadtask I had a
bunch of Github issues that I wanted to migrate to my kanboard instance, gpt-5
did a bang-up job on this script

It gets each issue, creates a tag for each label, creates the kanboard ticket, then closes the github issue

```bash

#!/bin/bash

# GitHub to Kanboard Issue Migration Script
# Uses GitHub CLI (gh) and curl to migrate issues

# Exit on error
set -e

# Check required environment variables
for var in KANBOARD_URL KANBOARD_TOKEN GH_TOKEN QUADTASK_KANBOARD_PROJECT_ID; do
    if [ -z "${!var}" ]; then
        echo "Error: $var is not set"
        exit 1
    fi
done

# GitHub repository (default: pypeaday/quadtask)
GITHUB_REPO=${GITHUB_REPO:-"pypeaday/quadtask"}

# Kanboard API endpoint
KANBOARD_API="$KANBOARD_URL/jsonrpc.php"

# Get all open issues from GitHub
echo "Fetching open issues from $GITHUB_REPO..."
ISSUES_JSON=$(gh issue list --repo "$GITHUB_REPO" --state open --limit 1000 --json number,title,body,labels)

# Count issues
ISSUE_COUNT=$(echo "$ISSUES_JSON" | jq '. | length')
echo "Found $ISSUE_COUNT open issues"

# Process each issue
echo "$ISSUES_JSON" | jq -c '.[]' | while read -r issue; do
    # Extract issue details
    NUMBER=$(echo "$issue" | jq -r '.number')
    TITLE=$(echo "$issue" | jq -r '.title')
    BODY=$(echo "$issue" | jq -r '.body // ""')
    # Extract label names as a JSON array
    LABELS_JSON=$(echo "$issue" | jq -c '[.labels[]?.name] // []')
    
    # Prepare Kanboard task data
    REQUEST_DATA=$(jq -n \
        --arg method "createTask" \
        --argjson id 1 \
        --arg jsonrpc "2.0" \
        --arg title "$TITLE" \
        --arg description "$BODY" \
        --arg project_id "$QUADTASK_KANBOARD_PROJECT_ID" \
        '{
            "jsonrpc": $jsonrpc,
            "method": $method,
            "id": $id,
            "params": {
                "title": $title,
                "description": $description,
                "project_id": $project_id
            }
        }')
    
    # Create task in Kanboard
    echo "Creating task: $TITLE"
    RESPONSE=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -u "jsonrpc:$KANBOARD_TOKEN" \
        -d "$REQUEST_DATA" \
        "$KANBOARD_API")
    
    # Check for errors
    if echo "$RESPONSE" | jq -e '.error' > /dev/null; then
        echo "Error creating task: $(echo "$RESPONSE" | jq -r '.error.message')"
    else
        TASK_ID=$(echo "$RESPONSE" | jq -r '.result')
        echo "Created task ID: $TASK_ID"

        # If there are labels, set them as Kanboard tags on the task
        if [ "$(echo "$LABELS_JSON" | jq 'length')" -gt 0 ]; then
            echo "Setting tags on task $TASK_ID: $(echo "$LABELS_JSON" | jq -r 'join(", ")')"
            TAGS_REQUEST=$(jq -n \
                --arg jsonrpc "2.0" \
                --arg method "setTaskTags" \
                --argjson id 2 \
                --arg project_id "$QUADTASK_KANBOARD_PROJECT_ID" \
                --arg task_id "$TASK_ID" \
                --argjson tags "$LABELS_JSON" \
                '{
                    jsonrpc: $jsonrpc,
                    method: $method,
                    id: $id,
                    params: {
                        project_id: $project_id,
                        task_id: $task_id,
                        tags: $tags
                    }
                }')

            TAGS_RESPONSE=$(curl -s -X POST \
                -H "Content-Type: application/json" \
                -u "jsonrpc:$KANBOARD_TOKEN" \
                -d "$TAGS_REQUEST" \
                "$KANBOARD_API")

            if echo "$TAGS_RESPONSE" | jq -e '.error' > /dev/null; then
                echo "Warning: Failed to set tags: $(echo "$TAGS_RESPONSE" | jq -r '.error.message')"
            else
                echo "Tags set successfully"
            fi
        fi

        # Close the corresponding GitHub issue to avoid duplicates
        TASK_URL="${KANBOARD_URL}/?controller=TaskViewController&action=show&task_id=${TASK_ID}"
        echo "Closing GitHub issue #$NUMBER with comment linking to Kanboard task..."
        if gh issue close "$NUMBER" --repo "$GITHUB_REPO" --comment "Migrated to Kanboard task $TASK_ID: $TASK_URL" >/dev/null; then
            echo "Closed GitHub issue #$NUMBER"
        else
            echo "Warning: Failed to close GitHub issue #$NUMBER"
        fi
    fi
    
    echo "----------------------------------------"
done

echo "Migration completed"
```
