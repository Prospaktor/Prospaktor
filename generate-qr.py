#!/usr/bin/env python3
"""
NutriTrack App QR Kod Oluşturucu
Bu script Expo Go uygulaması için QR kod oluşturur
"""

import qrcode
from PIL import Image
import os

def create_qr_code():
    # Expo Go için QR kod içeriği
    # Gerçek IP adresinizi buraya yazın
    expo_url = "exp://192.168.1.100:8081"
    
    # QR kod oluştur
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    
    qr.add_data(expo_url)
    qr.make(fit=True)
    
    # QR kod görselini oluştur
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Dosyayı kaydet
    img.save("nutritrack-qr.png")
    
    print("✅ QR kod oluşturuldu: nutritrack-qr.png")
    print(f"📱 Expo Go URL: {expo_url}")
    print("\n📋 Kullanım Talimatları:")
    print("1. Google Play Store'dan 'Expo Go' uygulamasını indirin")
    print("2. Expo Go'yu açın ve 'Scan QR Code' seçin")
    print("3. Oluşturulan QR kodu tarayın")
    print("4. Uygulama otomatik olarak yüklenecek")
    
    return expo_url

def create_manual_qr():
    """Manuel bağlantı için QR kod"""
    manual_url = "exp://192.168.1.100:8081"
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=8,
        border=4,
    )
    
    qr.add_data(manual_url)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img.save("nutritrack-manual-qr.png")
    
    print("✅ Manuel QR kod oluşturuldu: nutritrack-manual-qr.png")
    return manual_url

if __name__ == "__main__":
    try:
        print("🌱 NutriTrack App QR Kod Oluşturucu")
        print("=" * 40)
        
        # Ana QR kod
        url = create_qr_code()
        
        # Manuel QR kod
        create_manual_qr()
        
        print("\n🎯 Test Adımları:")
        print("1. Telefonunuzda Expo Go uygulamasını açın")
        print("2. QR kod tarama özelliğini kullanın")
        print("3. Oluşturulan QR kodu tarayın")
        print("4. Uygulama yüklenecek ve test edebilirsiniz")
        
        print(f"\n📡 Sunucu URL: {url}")
        print("💡 Bu URL'yi Expo Go'da manuel olarak da girebilirsiniz")
        
    except ImportError:
        print("❌ Gerekli kütüphaneler eksik!")
        print("📦 Yüklemek için: pip install qrcode[pil]")
        print("\n🔧 Alternatif olarak:")
        print("1. https://www.qr-code-generator.com/ adresine gidin")
        print("2. 'exp://192.168.1.100:8081' yazın")
        print("3. QR kod oluşturun ve kaydedin")
    except Exception as e:
        print(f"❌ Hata: {e}")
        print("\n🔧 Manuel QR Kod Oluşturma:")
        print("1. QR kod generator sitesine gidin")
        print("2. 'exp://192.168.1.100:8081' yazın")
        print("3. QR kodu oluşturun ve telefonda tarayın")