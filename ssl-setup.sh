#!/bin/bash

# SSL Certificate Generation Script
DOMAIN_NAME="mysocialscribe.com"
EMAIL="mysocialscribe.info@gmail.com"

# Ensure no web servers are running
sudo docker-compose down 2>/dev/null || true
sudo systemctl stop nginx 2>/dev/null || true
sudo systemctl stop apache2 2>/dev/null || true

# Delete any existing certificates for this domain
sudo certbot delete --cert-name $DOMAIN_NAME 2>/dev/null || true

# Ensure port 80 is free
if netstat -tuln | grep ":80"; then
    echo "Port 80 is still in use. Please free it before continuing."
    exit 1
fi

# Try to generate certificate with detailed output
echo "Attempting to generate SSL certificate..."
sudo certbot certonly \
    --standalone \
    --preferred-challenges http \
    --agree-tos \
    --non-interactive \
    -m $EMAIL \
    -d $DOMAIN_NAME \
    --verbose

# Check if certificate was generated successfully
if [ -d "/etc/letsencrypt/live/$DOMAIN_NAME" ]; then
    echo "Certificate generated successfully!"

    # Display certificate information
    sudo certbot certificates
else
    echo "Certificate generation failed. Attempting alternative method..."

    # Try with manual DNS verification
    sudo certbot certonly \
        --manual \
        --preferred-challenges dns \
        --agree-tos \
        -m $EMAIL \
        -d $DOMAIN_NAME
fi

# Verify certificate exists
if [ ! -d "/etc/letsencrypt/live/$DOMAIN_NAME" ]; then
    echo "
Certificate generation failed. Please ensure:
1. Domain $DOMAIN_NAME points to this server's IP
2. Port 80 is open in your firewall
3. No other service is using port 80
4. DNS records are properly configured

You can check DNS propagation at: https://dnschecker.org/#A/$DOMAIN_NAME
"
    exit 1
fi

# Set up auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo "
SSL Certificate Status:
----------------------------------------"
sudo certbot certificates
echo "----------------------------------------"
