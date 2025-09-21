# Déploiement OVH VPS (guide rapide)

1. **Build du backend** sur votre machine/CI :
   ```bash
   cd backend
   npm i
   npm run build
   # archive à transférer : backend/dist + package.json + package-lock.json + deploy/*
   ```

2. **Transfert vers le VPS** (ex.) :
   ```bash
   rsync -av backend/ user@VPS_IP:/opt/lolirine-backend/
   ```

3. **Installation sur le VPS** :
   ```bash
   ssh user@VPS_IP
   sudo bash /opt/lolirine-backend/deploy/install.sh
   cd /opt/lolirine-backend
   npm ci --only=production
   ```

4. **Configurer systemd** :
   - Éditez `deploy/lolirine-backend.service` et remplacez `DATABASE_URL` par votre URL OVH (avec `sslmode=require`).
   ```bash
   sudo cp deploy/lolirine-backend.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable --now lolirine-backend
   sudo systemctl status lolirine-backend
   ```

5. **Nginx reverse proxy** (optionnel si vous utilisez un port public) :
   - Éditez `deploy/nginx-lolirine-backend.conf` (nom de domaine/IP).
   ```bash
   sudo cp deploy/nginx-lolirine-backend.conf /etc/nginx/sites-available/lolirine-backend.conf
   sudo ln -sf /etc/nginx/sites-available/lolirine-backend.conf /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl restart nginx
   ```

6. **Healthcheck** :
   - http://YOUR_DOMAIN/health → `{ "ok": true }`
