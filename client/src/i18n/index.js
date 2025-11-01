import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Dil kaynakları
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.products': 'Products',
      'nav.cart': 'Cart',
      'nav.favorites': 'Favorites',
      'nav.about': 'About Us',
      'nav.login': 'Login',
      'nav.register': 'Register',
      'nav.logout': 'Logout',
      'nav.profile': 'Profile',

      // Common
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.add': 'Add',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.sort': 'Sort',
      'common.price': 'Price',
      'common.category': 'Category',
      'common.all': 'All',
      'common.view': 'View',
      'common.back': 'Back',

      // Products
      'products.title': 'Products',
      'products.noProducts': 'No products found',
      'products.addToCart': 'Add to Cart',
      'products.removeFromCart': 'Remove from Cart',
      'products.addToFavorites': 'Add to Favorites',
      'products.removeFromFavorites': 'Remove from Favorites',
      'products.outOfStock': 'Out of Stock',
      'products.inStock': 'In Stock',
      'products.fjallravenFoldsack': 'Fjallraven - Foldsack',
      'products.fjallravenDescription': 'Your perfect pack for everyday use and walks in the forest.',
      'products.casualPremiumTShirts': 'Mens Casual Premium T-Shirts',
      'products.casualPremiumDescription': 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket.',
      'categories.mensClothing': 'Men\'s Clothing',
      // Category keys (added so dropdown shows values instead of keys)
      'categories.All': 'All',
      'categories.men\'s clothing': 'Men\'s Clothing',
      'categories.jewelery': 'Jewelery',
      'categories.electronics': 'Electronics',
      'categories.women\'s clothing': 'Women\'s Clothing',
      'categories.others': 'Others',
      'categories.beauty': 'Beauty',
      'categories.fragrances': 'Fragrances',

      // Cart
      'cart.title': 'Shopping Cart',
      'cart.empty': 'Your cart is empty',
      'cart.checkout': 'Checkout',
      'cart.total': 'Total',
      'cart.subtotal': 'Subtotal',
      'cart.shipping': 'Shipping',
      'cart.tax': 'Tax',
      'cart.quantity': 'Quantity',

      // Auth
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.name': 'Name',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.forgotPassword': 'FORGOTTEN PASSWORD?',
      'auth.loginSuccess': 'Login successful',
      'auth.registerSuccess': 'Registration successful',
      'auth.logoutSuccess': 'Logout successful',

      // Language
      'language.select': 'Select language',
      'language.english': 'English',
      'language.german': 'German',
      'language.turkish': 'Turkish',

      // About
      'about.title': 'About Us',

      // Compare
      'compare.title': 'Product Comparison',
      'compare.noProducts': 'You have not selected any product',
      'compare.delete': 'Delete',
      'compare.addToCart': 'Add to Cart',
      'compare.titleLabel': 'Title',
      'compare.priceLabel': 'Price',
      'compare.categoryLabel': 'Category',
      'compare.ratingLabel': 'Rating',

      // Favorites
      'favorites.title': 'Favorites',
      'favorites.noProducts': 'You have no favorite products',
      'favorites.delete': 'Delete',
      'favorites.addToCart': 'Add to Cart',

      // Wishlist / Navbar
      'wishlist.favorite': 'Favorites',

      // Product Detail
      'productDetail.title': 'Product Detail',
      'productDetail.addToCart': 'Add to Cart',
      'productDetail.deleteFromCart': 'Delete from Cart',
      'productDetail.category': 'Category',

      // Product Form
      'productForm.title': 'Add Product Page',
      'productForm.name': 'Product Title',
      'productForm.quantity': 'Quantity',
      'productForm.price': 'Price',
      'productForm.description': 'Product Description',
      'productForm.imageUrl': 'Product Image URL',
      'productForm.category': 'Category',
      'productForm.addProduct': 'Add Product',
      'productForm.electronics': 'Electronics',
      'productForm.jewelery': 'Jewelery',
      'productForm.mensClothing': 'Men\'s Clothing',
      'productForm.womensClothing': 'Women\'s Clothing',

      // Product Table / List (English)
      'productTable.name': 'Name',
      'productTable.price': 'Price',
      'productTable.quantity': 'Quantity',
      'productTable.createdDate': 'Created Date',
      'productTable.updatedDate': 'Updated Date',
      'productTable.category': 'Category',
      'productTable.actions': 'Actions',
      'productTable.noProductsMessage': 'Product list not found. Please add a product',

      // Validation Messages
      'validation.nameRequired': 'Name must be between 2 and 25 characters',
      'validation.descriptionRequired': 'Description must be between 2 and 500 characters',
      'validation.imageRequired': 'Image URL must be between 2 and 700 characters',
      'validation.invalidEmail': 'Invalid email address',
      'validation.passwordRequired': 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',

      // Cart Messages
      'cart.emptyMessage': 'There are no items in the cart',
      'cart.summary': 'Summary',
      'cart.products': 'Products',

      // Auth Messages
      'auth.signIn': 'SIGN IN',
      'auth.checkEmail': 'CHECK YOUR EMAIL',
      'auth.showPassword': 'Show password',
      'auth.hidePassword': 'Hide password',
      'auth.haveAccount': 'YOU HAVE ALREADY AN ACCOUNT? LOGIN',
      'auth.noAccount': 'DON\'T HAVE AN ACCOUNT? REGISTER FOR FREE',
      'auth.backToHome': 'BACK TO HOME PAGE',

      // Footer
      'footer.copyright': '© {year} The Compare App',
      'footer.createdBy': 'Created with love by Kemal',

      // Profile
      'profile.changeProfilePicture': 'Change Profile Picture',
      'profile.fileSizeError': 'File size must be less than 3 MB.',

      // Example Page
      'example.page': 'Example Page',
      'example.test': 'Test',

      // Navbar
      'navbar.profile': 'Profile',
      'navbar.myAccount': 'My account',
      'navbar.settings': 'Settings',
      'navbar.logout': 'Logout',

      // Account / Profile dropdown
      'account.profile': 'Profile',
      'account.myAccount': 'My account',
      'account.settings': 'Settings',
      'account.logout': 'Logout',

      // Loading
      'loading.spinner': 'Loading...',

      // About Us
      'aboutUs.title': 'About Us'
    }
  },
  de: {
    translation: {
      // Navigation
      'nav.home': 'Startseite',
      'nav.products': 'Produkte',
      'nav.cart': 'Warenkorb',
      'nav.favorites': 'Favoriten',
      'nav.about': 'Über uns',
      'nav.login': 'Anmelden',
      'nav.register': 'Registrieren',
      'nav.logout': 'Abmelden',
      'nav.profile': 'Profil',

      // Common
      'common.loading': 'Lädt...',
      'common.error': 'Fehler',
      'common.success': 'Erfolg',
      'common.save': 'Speichern',
      'common.cancel': 'Abbrechen',
      'common.delete': 'Löschen',
      'common.edit': 'Bearbeiten',
      'common.add': 'Hinzufügen',
      'common.search': 'Suchen',
      'common.filter': 'Filtern',
      'common.sort': 'Sortieren',
      'common.price': 'Preis',
      'common.category': 'Kategorie',
      'common.all': 'Alle',
      'common.view': 'Ansehen',
      'common.back': 'Zurück',

      // Products
      'products.title': 'Produkte',
      'products.noProducts': 'Keine Produkte gefunden',
      'products.addToCart': 'In den Warenkorb',
      'products.removeFromCart': 'Aus Warenkorb entfernen',
      'products.addToFavorites': 'Zu Favoriten hinzufügen',
      'products.removeFromFavorites': 'Aus Favoriten entfernen',
      'products.outOfStock': 'Nicht auf Lager',
      'products.inStock': 'Auf Lager',
      // Product Form
      'productForm.addProduct': 'Produkt hinzufügen',

      // Category keys (added so dropdown shows values instead of keys)
      'categories.All': 'Alle',
      'categories.men\'s clothing': 'Herrenkleidung',
      'categories.jewelery': 'Schmuck',
      'categories.electronics': 'Elektronik',
      'categories.women\'s clothing': 'Damenbekleidung',
      'categories.others': 'Andere',
      'categories.beauty': 'Kosmetik',
      'categories.fragrances': 'Düfte',

      // Cart
      'cart.title': 'Warenkorb',
      'cart.empty': 'Ihr Warenkorb ist leer',
      'cart.checkout': 'Zur Kasse',
      'cart.total': 'Gesamt',
      'cart.subtotal': 'Zwischensumme',
      'cart.shipping': 'Versand',
      'cart.tax': 'Steuer',
      'cart.quantity': 'Menge',

      // Auth
      'auth.login': 'Anmelden',
      'auth.register': 'Registrieren',
      'auth.name': 'Name',
      'auth.email': 'E-Mail',
      'auth.password': 'Passwort',
      'auth.confirmPassword': 'Passwort bestätigen',
      'auth.forgotPassword': 'PASSWORT VERGESSEN?',
      'auth.loginSuccess': 'Anmeldung erfolgreich',
      'auth.registerSuccess': 'Registrierung erfolgreich',
      'auth.logoutSuccess': 'Abmeldung erfolgreich',

      // Additional Auth Messages (missing previously)
      'auth.signIn': 'ANMELDEN',
      'auth.checkEmail': 'E-MAIL ÜBERPRÜFEN',
      'auth.showPassword': 'Passwort anzeigen',
      'auth.hidePassword': 'Passwort verbergen',
      'auth.haveAccount': 'SIE HABEN BEREITS EIN KONTO? ANMELDEN',
      'auth.noAccount': 'KEIN KONTO? KOSTENLOS REGISTRIEREN',
      'auth.backToHome': 'ZURÜCK ZUR STARTSEITE',

      // Language
      'language.select': 'Sprache wählen',
      'language.english': 'Englisch',
      'language.german': 'Deutsch',
      'language.turkish': 'Türkisch',

      // Footer
      'footer.copyright': '© {year} Die Vergleichs-App',
      'footer.createdBy': 'Erstellt mit Liebe von Kemal',

      // Profile
      'profile.changeProfilePicture': 'Profilbild ändern',
      'profile.fileSizeError': 'Dateigröße muss kleiner als 3 MB sein.',

      // Example Page
      'example.page': 'Beispielseite',
      'example.test': 'Test',

      // Navbar
      'navbar.profile': 'Profil',
      'navbar.myAccount': 'Mein Konto',
      'navbar.settings': 'Einstellungen',
      'navbar.logout': 'Abmelden',

      // Account / Profile dropdown
      'account.profile': 'Profil',
      'account.myAccount': 'Mein Konto',
      'account.settings': 'Einstellungen',
      'account.logout': 'Abmelden',

      // Loading
      'loading.spinner': 'Lädt...',

      // About Us
      'aboutUs.title': 'Über uns',

      // Product Table / List (German)
      'productTable.name': 'Name',
      'productTable.price': 'Preis',
      'productTable.quantity': 'Menge',
      'productTable.createdDate': 'Erstellungsdatum',
      'productTable.updatedDate': 'Aktualisierungsdatum',
      'productTable.category': 'Kategorie',
      'productTable.actions': 'Aktionen',
      'productTable.noProductsMessage': 'Produktliste nicht gefunden. Bitte fügen Sie ein Produkt hinzu',

      // Wishlist / Navbar
      'wishlist.favorite': 'Favoriten',
    }
  },
  tr: {
    translation: {
      // Navigation
      'nav.home': 'Ana Sayfa',
      'nav.products': 'Ürünler',
      'nav.cart': 'Sepet',
      'nav.favorites': 'Favoriler',
      'nav.about': 'Hakkımızda',
      'nav.login': 'Giriş Yap',
      'nav.register': 'Kayıt Ol',
      'nav.logout': 'Çıkış Yap',
      'nav.profile': 'Profil',

      // Common
      'common.loading': 'Yükleniyor...',
      'common.error': 'Hata',
      'common.success': 'Başarılı',
      'common.save': 'Kaydet',
      'common.cancel': 'İptal',
      'common.delete': 'Sil',
      'common.edit': 'Düzenle',
      'common.add': 'Ekle',
      'common.search': 'Ara',
      'common.filter': 'Filtrele',
      'common.sort': 'Sırala',
      'common.price': 'Fiyat',
      'common.category': 'Kategori',
      'common.all': 'Tümü',
      'common.view': 'Görüntüle',
      'common.back': 'Geri',

      // Products
      'products.title': 'Ürünler',
      'products.noProducts': 'Ürün bulunamadı',
      'products.addToCart': 'Sepete Ekle',
      'products.removeFromCart': 'Sepetten Çıkar',
      'products.addToFavorites': 'Favorilere Ekle',
      'products.removeFromFavorites': 'Favorilerden Çıkar',
      'products.outOfStock': 'Stokta Yok',
      'products.inStock': 'Stokta Var',
      // Product Form
      'productForm.addProduct': 'Ürün Ekle',

      // Category keys (added so dropdown shows values instead of keys)
      'categories.All': 'Tümü',
      'categories.men\'s clothing': 'Erkek Giyim',
      'categories.jewelery': 'Mücevher',
      'categories.electronics': 'Elektronik',
      'categories.women\'s clothing': 'Kadın Giyim',
      'categories.others': 'Diğerleri',
      'categories.beauty': 'Güzellik',
      'categories.fragrances': 'Parfümler',

      // Cart
      'cart.title': 'Alışveriş Sepeti',
      'cart.empty': 'Sepetiniz boş',
      'cart.checkout': 'Ödeme Yap',
      'cart.total': 'Toplam',
      'cart.subtotal': 'Ara Toplam',
      'cart.shipping': 'Kargo',
      'cart.tax': 'Vergi',
      'cart.quantity': 'Adet',

      // Auth
      'auth.login': 'Giriş Yap',
      'auth.register': 'Kayıt Ol',
      'auth.name': 'İsim',
      'auth.email': 'E-posta',
      'auth.password': 'Şifre',
      'auth.confirmPassword': 'Şifreyi Onayla',
      'auth.forgotPassword': 'ŞİFREMİ UNUTTUM?',
      'auth.loginSuccess': 'Giriş başarılı',
      'auth.registerSuccess': 'Kayıt başarılı',
      'auth.logoutSuccess': 'Çıkış başarılı',

      // Additional Auth Messages (missing previously)
      'auth.signIn': 'GİRİŞ YAP',
      'auth.checkEmail': 'E‑POSTANIZI KONTROL EDİN',
      'auth.showPassword': 'Şifreyi göster',
      'auth.hidePassword': 'Şifreyi gizle',
      'auth.haveAccount': 'ZATEN HESABINIZ VAR MI? GİRİŞ YAP',
      'auth.noAccount': 'HESABINIZ YOK MU? ÜCRETSİZ KAYIT OL',
      'auth.backToHome': 'ANA SAYFAYA DÖN',

      // Language
      'language.select': 'Dil Seçin',
      'language.english': 'İngilizce',
      'language.german': 'Almanca',
      'language.turkish': 'Türkçe',

      // Footer
      'footer.copyright': '© {year} Karşılaştırma Uygulaması',
      'footer.createdBy': 'Kemal tarafından sevgiyle oluşturuldu',

      // Profile
      'profile.changeProfilePicture': 'Profil Resmini Değiştir',
      'profile.fileSizeError': 'Dosya boyutu 3 MB\'dan küçük olmalıdır.',

      // Example Page
      'example.page': 'Örnek Sayfa',
      'example.test': 'Test',

      // Navbar
      'navbar.profile': 'Profil',
      'navbar.myAccount': 'Hesabım',
      'navbar.settings': 'Ayarlar',
      'navbar.logout': 'Çıkış Yap',

      // Account / Profile dropdown
      'account.profile': 'Profil',
      'account.myAccount': 'Hesabım',
      'account.settings': 'Ayarlar',
      'account.logout': 'Çıkış Yap',

      // Loading
      'loading.spinner': 'Yükleniyor...',

      // About Us
      'aboutUs.title': 'Hakkımızda',

      // Product Table / List (Turkish)
      'productTable.name': 'Ad',
      'productTable.price': 'Fiyat',
      'productTable.quantity': 'Miktar',
      'productTable.createdDate': 'Oluşturulma Tarihi',
      'productTable.updatedDate': 'Güncellenme Tarihi',
      'productTable.category': 'Kategori',
      'productTable.actions': 'İşlemler',
      'productTable.noProductsMessage': 'Ürün listesi bulunamadı. Lütfen bir ürün ekleyin',

      // Wishlist / Navbar
      'wishlist.favorite': 'Favoriler',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React zaten XSS koruması yapıyor
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;