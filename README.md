# LST Dokümantasyon Sitesi

LST (Limited Supply Tokenization) protokolü için modern ve kapsamlı dokümantasyon sitesi.

## 🚀 Özellikler

### 📚 Kapsamlı Dokümantasyon
- **Başlangıç Rehberi**: Hızlı başlangıç ve kurulum talimatları
- **Temel Kavramlar**: LST nedir, tokenomics, mimari
- **Smart Contracts**: Token, staking ve swap contract'ları
- **API Referansı**: REST API ve WebSocket endpoint'leri
- **Entegrasyon**: Web3, frontend ve mobil entegrasyonları
- **Geliştirme**: Test etme, deployment ve güvenlik

### 🎨 Modern Tasarım
- **docs.heaven.xyz benzeri tasarım**: Profesyonel ve temiz görünüm
- **Dark/Light tema**: Kullanıcı tercihi ile tema değiştirme
- **Responsive tasarım**: Mobil ve desktop uyumlu
- **Smooth animasyonlar**: Modern kullanıcı deneyimi

### 🔍 Gelişmiş Arama
- **Gerçek zamanlı arama**: Sayfa içeriğinde hızlı arama
- **Keyboard shortcuts**: Ctrl+K ile arama açma
- **Akıllı sonuçlar**: Başlık ve içerik bazlı arama

### 📱 Kullanıcı Deneyimi
- **Sidebar navigasyon**: Kolay bölüm geçişi
- **Aktif bölüm takibi**: Scroll ile otomatik güncelleme
- **Kopyalama butonları**: Tek tıkla adres kopyalama
- **Mobil menü**: Dokunmatik cihazlar için optimize

## 🛠️ Teknolojiler

- **HTML5**: Semantic markup
- **CSS3**: Modern styling ve animasyonlar
- **JavaScript (ES6+)**: İnteraktif özellikler
- **Prism.js**: Kod vurgulama
- **Font Awesome**: İkonlar
- **Inter Font**: Modern tipografi

## 📁 Dosya Yapısı

```
docs/
├── docs.html          # Ana HTML dosyası
├── docs-styles.css    # CSS stilleri
├── docs-script.js     # JavaScript fonksiyonları
├── logo.jpeg          # LST logosu
└── README.md          # Bu dosya
```

## 🚀 Kurulum

1. **Dosyaları indirin**:
```bash
git clone https://github.com/your-repo/lst-docs.git
cd lst-docs
```

2. **Yerel sunucu başlatın**:
```bash
# Python ile
python -m http.server 8000

# Node.js ile
npx serve .

# PHP ile
php -S localhost:8000
```

3. **Tarayıcıda açın**:
```
http://localhost:8000/docs.html
```

## 📖 İçerik Bölümleri

### 1. Başlangıç
- **Giriş**: LST protokolü hakkında genel bilgi
- **Hızlı Başlangıç**: 3 adımda LST kullanımı
- **Kurulum**: Geliştirme ortamı kurulumu

### 2. Temel Kavramlar
- **LST Nedir?**: Protokol açıklaması
- **Tokenomics**: Token ekonomisi
- **Mimari**: Sistem mimarisi

### 3. Smart Contracts
- **LST Token**: Ana token contract'ı
- **Staking Contract**: Staking işlemleri
- **Swap Contract**: Token değişimi
- **Governance**: Yönetişim sistemi

### 4. API Referansı
- **REST API**: HTTP endpoint'leri
- **WebSocket**: Gerçek zamanlı veri
- **SDK**: Geliştirici araçları

### 5. Entegrasyon
- **Web3 Entegrasyonu**: Blockchain bağlantısı
- **Frontend**: Web uygulamaları
- **Mobil**: Mobil uygulamalar

### 6. Geliştirme
- **Test Etme**: Test stratejileri
- **Deployment**: Yayınlama süreci
- **Güvenlik**: Güvenlik önlemleri

### 7. Referans
- **Contract Adresleri**: Tüm contract'lar
- **SSS**: Sık sorulan sorular
- **Destek**: İletişim kanalları

## 🎯 Özellik Detayları

### Tema Sistemi
- Light ve dark tema desteği
- Local storage ile tema tercihi saklama
- Otomatik tema değiştirme butonu

### Arama Sistemi
- Gerçek zamanlı arama
- Başlık ve içerik bazlı sonuçlar
- Keyboard shortcut desteği (Ctrl+K)

### Navigasyon
- Sidebar menü sistemi
- Aktif bölüm vurgulama
- Smooth scrolling

### Kod Vurgulama
- Prism.js ile syntax highlighting
- JavaScript, Solidity, JSON desteği
- Kopyalama butonları

### Responsive Tasarım
- Mobil-first yaklaşım
- Tablet ve desktop optimizasyonu
- Touch-friendly arayüz

## 🔧 Özelleştirme

### Renk Teması Değiştirme
`docs-styles.css` dosyasında CSS değişkenlerini düzenleyin:

```css
:root {
    --accent-color: #3b82f6;    /* Ana renk */
    --bg-primary: #ffffff;      /* Arka plan */
    --text-primary: #1e293b;    /* Metin rengi */
}
```

### İçerik Güncelleme
`docs.html` dosyasında ilgili bölümleri düzenleyin:

```html
<section id="your-section" class="doc-section">
    <h2>Başlık</h2>
    <p>İçerik...</p>
</section>
```

### Navigasyon Ekleme
Sidebar'a yeni bölüm eklemek için:

```html
<div class="nav-section">
    <h3 class="nav-title">Yeni Bölüm</h3>
    <ul class="nav-list">
        <li><a href="#new-section" class="nav-link">Yeni Sayfa</a></li>
    </ul>
</div>
```

## 📱 Mobil Optimizasyon

- **Touch gestures**: Dokunmatik etkileşimler
- **Responsive images**: Uyarlanabilir görseller
- **Mobile menu**: Hamburger menü
- **Touch targets**: Dokunma alanları optimizasyonu

## 🔍 SEO Optimizasyonu

- **Semantic HTML**: Anlamlı markup
- **Meta tags**: Arama motoru meta etiketleri
- **Structured data**: Schema.org markup
- **Sitemap**: XML sitemap desteği

## 🚀 Deployment

### GitHub Pages
```bash
git add .
git commit -m "Add documentation site"
git push origin main
```

### Netlify
1. Netlify'e dosyaları sürükleyin
2. Build komutu: `echo "Static site"`
3. Publish directory: `.`

### Vercel
```bash
npm i -g vercel
vercel
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **E-posta**: limitedsupplytokenizaiton@gmail.com
- **Telegram**: @LSTCommunity

- **GitHub**: github.com/lst-protocol

## 🔄 Güncellemeler

### v1.0.0 (2024-01-XX)
- İlk sürüm
- Temel dokümantasyon yapısı
- Dark/Light tema desteği
- Responsive tasarım
- Arama fonksiyonu

---

**LST Dokümantasyon Sitesi** - Limited Supply Tokenization protokolü için kapsamlı teknik dokümantasyon.
