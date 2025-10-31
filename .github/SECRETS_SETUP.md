# GitHub Secrets Configuration Guide

Bu dosya, GitHub Actions CI/CD pipeline'ının düzgün çalışması için gerekli secrets'ların yapılandırma rehberidir.

## Frontend Secrets (Client)

### Vercel Deployment için
- `VERCEL_TOKEN`: Vercel hesabınızdan alacağınız API token
- `VERCEL_ORG_ID`: Vercel organizasyon ID'si
- `VERCEL_PROJECT_ID`: Vercel proje ID'si

### Client Environment Variables (Vercel'de de ayarlanmalı)
- `REACT_APP_API_URL`: Backend API URL'i
- `REACT_APP_AUTH0_DOMAIN`: Auth0 domain (eğer kullanıyorsanız)
- `REACT_APP_AUTH0_CLIENT_ID`: Auth0 client ID

## Backend Secrets (Server)

### Database
- `MONGODB_URI`: MongoDB connection string (production)
- `MONGODB_TEST_URI`: MongoDB connection string (test)

### Authentication
- `JWT_SECRET`: JWT token için secret key
- `JWT_EXPIRES_IN`: JWT token süresi (örn: "7d")

### Email Service
- `EMAIL_SERVICE`: Email servis sağlayıcısı
- `EMAIL_USER`: Email kullanıcı adı
- `EMAIL_PASS`: Email şifresi

### Firebase (eğer kullanıyorsanız)
- `FIREBASE_API_KEY`: Firebase API key
- `FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `FIREBASE_PROJECT_ID`: Firebase proje ID'si
- `FIREBASE_STORAGE_BUCKET`: Firebase storage bucket

### Deployment Secrets
- `RAILWAY_TOKEN`: Railway deployment token (alternatif: Heroku, DigitalOcean)
- `SLACK_WEBHOOK`: Slack bildirim webhook URL'i (opsiyonel)

## GitHub Repository Secrets'ları nasıl eklenir:

1. GitHub repository'nize gidin
2. Settings > Secrets and variables > Actions
3. "New repository secret" butonuna tıklayın
4. Secret name ve value girin
5. "Add secret" butonuna tıklayın

## Environment Variables Template

### Server .env dosyası için template:
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
```

### Client .env dosyası için template:
```env
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_AUTH0_DOMAIN=your_auth0_domain
REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
```

## Önemli Notlar:

1. **Asla** gerçek secrets'ları kodda veya .env dosyalarında commit etmeyin
2. Production ve staging ortamları için farklı secrets kullanın
3. JWT_SECRET minimum 32 karakter olmalı ve güçlü olmalı
4. Database connection string'lerinde özel karakterler varsa URL encode edin
5. Email şifreleri için app-specific password kullanın (Gmail için)