#!/bin/bash

# NutriTrack App Setup Script
# This script helps set up the development environment

echo "🌱 Setting up NutriTrack App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install Expo CLI globally if not already installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
else
    echo "✅ Expo CLI is already installed"
fi

# Install project dependencies
echo "📦 Installing project dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your actual API keys"
else
    echo "✅ .env file already exists"
fi

# Check if assets exist
echo "🎨 Checking assets..."
if [ ! -f assets/icon.png ] || [ -s assets/icon.png ]; then
    echo "⚠️  Please replace assets/icon.png with your app icon (1024x1024 PNG)"
fi

if [ ! -f assets/splash.png ] || [ -s assets/splash.png ]; then
    echo "⚠️  Please replace assets/splash.png with your splash screen"
fi

if [ ! -f assets/adaptive-icon.png ] || [ -s assets/adaptive-icon.png ]; then
    echo "⚠️  Please replace assets/adaptive-icon.png with your adaptive icon"
fi

if [ ! -f assets/favicon.png ] || [ -s assets/favicon.png ]; then
    echo "⚠️  Please replace assets/favicon.png with your favicon"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Edit .env file with your API keys"
echo "2. Replace placeholder assets with your actual app icons"
echo "3. Run 'npm start' to start the development server"
echo "4. Run 'npm run ios' or 'npm run android' to run on device/simulator"
echo ""
echo "📚 For more information, see README.md"
echo ""
echo "Happy coding! 🌱"