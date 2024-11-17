#!/bin/bash

# Env Vars - These should match your original deployment
DOMAIN_NAME="mysocialscribe.com"
APP_DIR=~/myapp

# Exit on any error
set -e

# Function to check if docker is running
check_docker() {
    if ! sudo systemctl is-active --quiet docker; then
        echo "Docker is not running. Starting Docker..."
        sudo systemctl start docker
        sleep 5
    fi
}

# Function to backup current .env
backup_env() {
    if [ -f "$APP_DIR/.env" ]; then
        cp "$APP_DIR/.env" "$APP_DIR/.env.backup"
        echo "Backed up .env file"
    fi
}

# Function to restore .env if something goes wrong
restore_env() {
    if [ -f "$APP_DIR/.env.backup" ]; then
        mv "$APP_DIR/.env.backup" "$APP_DIR/.env"
        echo "Restored .env file from backup"
    fi
}

# Function to check container health
check_containers() {
    if ! sudo docker-compose ps | grep "Up"; then
        echo "Error: Containers failed to start properly"
        sudo docker-compose logs
        return 1
    fi
    return 0
}

echo "Starting redeployment process..."

# Check if application directory exists
if [ ! -d "$APP_DIR" ]; then
    echo "Error: Application directory not found at $APP_DIR"
    echo "Please run the initial deployment script first"
    exit 1
fi

# Ensure Docker is running
check_docker

# Navigate to app directory
cd "$APP_DIR" || exit 1

# Backup current state
echo "Creating backup of current state..."
backup_env
sudo docker-compose ps > docker-compose.state

# Pull latest changes from git
echo "Pulling latest changes from repository..."
git fetch
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "No updates available. Already at latest version."
else
    echo "Updates found. Proceeding with deployment..."

    # Pull latest changes
    git pull

    # Stop the current containers
    echo "Stopping current containers..."
    sudo docker-compose down

    # Rebuild and start containers
    echo "Building and starting updated containers..."
    sudo docker-compose build --no-cache
    sudo docker-compose up -d

    # Wait for containers to stabilize
    echo "Waiting for containers to stabilize..."
    sleep 10

    # Check if containers are healthy
    if ! check_containers; then
        echo "Deployment failed. Rolling back..."
        sudo docker-compose down
        git reset --hard HEAD@{1}
        restore_env
        sudo docker-compose up -d
        exit 1
    fi

    # Clean up old images
    echo "Cleaning up old Docker images..."
    sudo docker image prune -f

    echo "
Redeployment completed successfully!
----------------------------------------
Domain: https://$DOMAIN_NAME
Container Status:"
    sudo docker-compose ps
    echo "----------------------------------------"
fi

# Remove backup if everything went well
rm -f "$APP_DIR/.env.backup"
rm -f docker-compose.state

echo "
Useful commands:
- View logs: 'docker-compose logs'
- Stop application: 'docker-compose down'
- Container status: 'docker-compose ps'
"
