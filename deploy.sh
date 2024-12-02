#!/bin/bash

# Env Vars
DOMAIN_NAME="mysocialscribe.com" # replace with your own
EMAIL="mysocialscribe.info@gmail.com" # replace with your own
PASS="${PASS:-}"  # Use empty string if not set
SUPABASE_URL="${SUPABASE_URL:-}"
SUPABASE_ANON_KEY="${SUPABASE_ANON_KEY:-}"
GA_MEASUREMENT_ID="${GA_MEASUREMENT_ID:-}"

# Script Vars
REPO_URL="https://github.com/mysocialscribe/mysocialscribe-app"
APP_DIR=~/myapp

# Exit on any error
set -e

# Update package list and upgrade existing packages
sudo apt update && sudo apt upgrade -y

# Install yt-dlp
pip install ytdlp


# Install Docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" -y
sudo apt update
sudo apt install docker-ce -y

# Install Docker Compose
sudo rm -f /usr/local/bin/docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

# Verify Docker Compose installation
if ! docker-compose --version; then
  echo "Docker Compose installation failed. Exiting."
  exit 1
fi

# Ensure Docker starts on boot and start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Clone the Git repository
if [ -d "$APP_DIR" ]; then
  echo "Directory $APP_DIR already exists. Pulling latest changes..."
  cd "$APP_DIR" && git pull
else
  echo "Cloning repository from $REPO_URL..."
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# Create .env file with all necessary variables
cat > "$APP_DIR/.env" << EOF
DOMAIN_NAME=$DOMAIN_NAME
PASS=$PASS
SUPABASE_URL=$SUPABASE_URL
SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
GA_MEASUREMENT_ID=$GA_MEASUREMENT_ID
EOF

# Stop any running containers before SSL certificate generation
if [ -f "docker-compose.yml" ]; then
  sudo docker-compose down
fi

# Install and run Certbot
sudo apt install certbot -y
sudo certbot certonly --standalone -d "$DOMAIN_NAME" --non-interactive --agree-tos -m "$EMAIL"

# Build and run the Docker containers
sudo docker-compose up --build -d

# Wait for containers to be up
echo "Waiting for containers to start..."
sleep 10

# Check if Docker Compose started correctly
if ! sudo docker-compose ps | grep "Up"; then
  echo "Docker containers failed to start. Checking logs..."
  sudo docker-compose logs
  exit 1
fi

# Output final message with status
echo "
Deployment complete! Status:
----------------------------------------
Domain: https://$DOMAIN_NAME
Environment Variables Set:
- PASS: ${PASS:-(not set)}
- SUPABASE_URL: ${SUPABASE_URL:-(not set)}
- SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY:-(not set)}

To view logs: 'docker-compose logs'
To stop: 'docker-compose down'
----------------------------------------
"
