# 🐳 Docker Usage Guide

Bu proje sadece **backend** için Docker kullanıyor. Frontend static olarak deploy ediliyor.

## 📦 **Setup**

### Prerequisites
- Docker Desktop kurulu olmalı
- Docker Compose included

### Environment Setup
```bash
cd server
cp .env.example .env
# .env dosyasını kendi ayarlarınızla güncelleyin
```

## 🚀 **Usage**

### Development Mode (MongoDB Express UI ile)
```bash
# Tüm servisleri development modunda başlat
npm run docker:dev

# Servisler:
# - Backend API: http://localhost:3000
# - MongoDB: localhost:27017
# - Mongo Express UI: http://localhost:8081 (admin/password)
```

### Production Mode
```bash
# Sadece backend + MongoDB
npm run docker:prod

# Background'da çalışır
# - Backend API: http://localhost:3000
# - MongoDB: localhost:27017
```

### Individual Commands
```bash
# Backend image build et
npm run docker:build

# Sadece backend çalıştır (MongoDB external)
npm run docker:run

# Logları izle
docker-compose logs -f backend

# Servisleri durdur
docker-compose down

# Volumes ile beraber temizle
docker-compose down -v
```

## 🗂️ **Data Persistence**

- **MongoDB Data**: `mongodb_data` volume
- **File Uploads**: `uploads` volume

Data kalıcıdır, container restart'ta silinmez.

## 🔧 **Environment Variables**

### Required
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT secret key
- `PORT`: Server port (default: 3000)

### Optional
- `EMAIL_*`: Email service configuration
- `FIREBASE_*`: Firebase configuration
- `FRONTEND_URL`: CORS origins

## 🌐 **Network**

Services `shopping-network` bridge network'ünde çalışır:
- Backend: `backend:3000`
- MongoDB: `mongodb:27017`

## 📊 **Health Checks**

Backend health endpoint: `GET /health`
- Docker health check her 30 saniyede çalışır
- 3 başarısız deneme sonrası unhealthy

## 🔄 **CI/CD Integration**

Docker CI pipeline için `.github/workflows/docker.yml` kullanılabilir:
- Image build & test
- Registry push
- Deployment