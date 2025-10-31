# 🛒 Shopping App MERN

Modern ve responsive e-ticaret uygulaması. MongoDB, Express.js, React ve Node.js ile geliştirilmiştir.

## 🚀 Live Demo

**Frontend:** https://shopping-app-mern-2ukh.vercel.app/

## 📋 Özellikler

- ✅ Kullanıcı kimlik doğrulama (Auth0/JWT)
- ✅ Ürün kataloğu ve arama
- ✅ Sepet yönetimi
- ✅ Favoriler sistemi
- ✅ Responsive tasarım (Material-UI)
- ✅ State yönetimi (Redux Toolkit)
- ✅ File upload (Firebase/Multer)
- ✅ Email bildirimleri

## 🛠️ Teknolojiler

### Frontend
- React 18.x
- Redux Toolkit
- Material-UI (MUI)
- React Router
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File Upload)
- Nodemailer
- bcrypt

## 🏗️ CI/CD Pipeline

Bu proje GitHub Actions ile otomatik CI/CD pipeline'ına sahiptir:

### ✅ Continuous Integration
- **Multi-Node Testing**: Node.js 18.x ve 20.x versiyonları
- **Frontend Tests**: Jest testleri ve coverage raporu
- **Backend Tests**: API testleri ve MongoDB integration
- **Security Audit**: npm audit ve dependency vulnerability check
- **Code Quality**: ESLint kontrolü
- **Cross-Platform**: Ubuntu, Windows, macOS uyumluluğu

### 🚀 Continuous Deployment
- **Staging**: Pull request'ler otomatik staging ortamına deploy
- **Production**: Main branch'e merge sonrası production deploy
- **Frontend**: Vercel
- **Backend**: Railway/Heroku
- **Notifications**: Slack entegrasyonu

### 📊 Pipeline Status
![CI](https://github.com/kemaltt/shoppingApp_MERN/workflows/CI%20Pipeline/badge.svg)
![Deploy](https://github.com/kemaltt/shoppingApp_MERN/workflows/Deploy%20to%20Production/badge.svg)

## 🔧 Kurulum

### Prerequisites
- Node.js 18+ 
- MongoDB
- npm veya yarn

### Local Development

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/kemaltt/shoppingApp_MERN.git
cd shoppingApp_MERN
```

2. **Backend kurulumu**
```bash
cd server
npm install
cp .env.example .env  # Environment variables'ları ayarlayın
npm run dev
```

3. **Frontend kurulumu**
```bash
cd client
npm install
cp .env.example .env  # Environment variables'ları ayarlayın
npm start
```

### 🔑 Environment Variables

Environment variables'ların nasıl ayarlanacağı için [SECRETS_SETUP.md](.github/SECRETS_SETUP.md) dosyasına bakın.

## 🧪 Testing

```bash
# Frontend testleri
cd client
npm test

# Backend testleri
cd server
npm test

# Coverage raporu
npm run test:coverage
```

## 📦 Build

```bash
# Frontend build
cd client
npm run build

# Production build kontrolü
cd server
npm start
```

## 🌊 Branch Strategy

- `main`: Production branch
- `develop`: Development branch  
- `feature/*`: Yeni özellikler
- `bugfix/*`: Bug düzeltmeleri
- `hotfix/*`: Acil düzeltmeler

### Commit Convention
```
type(scope): description

Örnekler:
feat(auth): add user login functionality
fix(cart): resolve item removal bug
docs(readme): update installation guide
```

## 🤝 Contributing

1. Fork the repository
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

**Geliştirici:** Kemal
**Email:** [your-email@example.com]
**GitHub:** [@kemaltt](https://github.com/kemaltt)

## 📄 License

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.
