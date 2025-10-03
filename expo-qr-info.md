# NutriTrack App - QR Kod Bilgileri

## 📱 Android Test için QR Kod

Expo Go uygulaması ile test etmek için aşağıdaki bilgileri kullanın:

### Expo Go Uygulaması
1. **Google Play Store**'dan **Expo Go** uygulamasını indirin
2. Uygulamayı açın
3. **Scan QR Code** seçeneğini seçin
4. Aşağıdaki QR kodu tarayın

### QR Kod İçeriği
```
exp://192.168.1.100:8081
```

### Manuel Bağlantı
Eğer QR kod çalışmazsa, Expo Go uygulamasında:
1. **Enter URL manually** seçeneğini seçin
2. Aşağıdaki URL'yi girin:
```
exp://192.168.1.100:8081
```

### Alternatif Test Yöntemleri

#### 1. Web Browser Test
```bash
npm start
# Sonra tarayıcıda http://localhost:19006 adresini açın
```

#### 2. Android Emulator
```bash
npm run android
# Android Studio emulator'ü çalıştırın
```

#### 3. APK Build
```bash
expo build:android
# APK dosyası oluşturup telefona yükleyin
```

## 🔧 Geliştirme Sunucusu Başlatma

### Yerel Ağ Üzerinden
```bash
# Terminal'de proje klasöründe
npx expo start --lan
```

### Tunnel ile (İnternet üzerinden)
```bash
npx expo start --tunnel
```

## 📋 Test Checklist

- [ ] Expo Go uygulaması yüklendi
- [ ] QR kod tarandı veya URL manuel girildi
- [ ] Uygulama yüklendi
- [ ] Ana ekran görüntülendi
- [ ] AI Chat özelliği test edildi
- [ ] Kamera özelliği test edildi
- [ ] Tarifler bölümü test edildi
- [ ] Topluluk özelliği test edildi
- [ ] Profil ayarları test edildi

## 🚨 Sorun Giderme

### QR Kod Taramıyor
- Expo Go uygulamasının güncel olduğundan emin olun
- Aynı WiFi ağında olduğunuzdan emin olun
- Manuel URL girişini deneyin

### Uygulama Yüklenmiyor
- İnternet bağlantınızı kontrol edin
- Expo CLI'nin güncel olduğundan emin olun
- `expo doctor` komutu ile sorunları kontrol edin

### Kamera Çalışmıyor
- Telefon kamera izinlerini kontrol edin
- Expo Go uygulamasına kamera erişimi verin

## 📞 Destek

Sorun yaşarsanız:
1. Expo dokümantasyonunu kontrol edin
2. GitHub issues bölümünde sorun bildirin
3. Expo Discord topluluğundan yardım alın