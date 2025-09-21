#!/usr/bin/env bash
set -euo pipefail

# Install Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

# Create app directory
sudo mkdir -p /opt/lolirine-backend
sudo chown -R $USER:$USER /opt/lolirine-backend

echo "Copy your built backend into /opt/lolirine-backend then:"
echo "  cd /opt/lolirine-backend && npm ci --only=production"
echo "  sudo cp /opt/lolirine-backend/deploy/lolirine-backend.service /etc/systemd/system/"
echo "  sudo systemctl daemon-reload && sudo systemctl enable --now lolirine-backend"
echo "  sudo cp /opt/lolirine-backend/deploy/nginx-lolirine-backend.conf /etc/nginx/sites-available/lolirine-backend.conf"
echo "  sudo ln -sf /etc/nginx/sites-available/lolirine-backend.conf /etc/nginx/sites-enabled/"
echo "  sudo nginx -t && sudo systemctl restart nginx"
