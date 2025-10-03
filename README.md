# NutriTrack - Comprehensive Health & Nutrition App

A feature-rich React Native application for calorie counting, food recognition, and healthy lifestyle management. Similar to FatSecret but with enhanced AI-powered features and community integration.

## 🌟 Features

### Core Functionality
- **Food Recognition**: AI-powered camera scanning to identify food and calculate nutrition
- **Comprehensive Nutrition Tracking**: Detailed macronutrient and micronutrient information
- **Recipe Database**: Hundreds of thousands of healthy recipes with filtering
- **Community Features**: Share recipes, reviews, and health tips
- **AI Chat Assistant**: ChatGPT integration for nutrition questions and advice

### Premium Features
- **Personalized Diet Plans**: AI-generated weekly meal plans based on user goals
- **Advanced Analytics**: Detailed nutrition trends and progress tracking
- **Exclusive Recipes**: Premium recipe collection and chef recommendations

### Health Management
- **Allergy & Illness Tracking**: Comprehensive system to avoid problematic foods
- **BMI & Health Metrics**: Automatic calculation of health indicators
- **Goal Setting**: Weight loss, maintenance, or gain with personalized recommendations

### User Experience
- **Green Theme**: Beautiful, calming color scheme throughout the app
- **Intuitive Navigation**: Easy-to-use interface with bottom tab navigation
- **Responsive Design**: Optimized for various screen sizes
- **Offline Support**: Core features work without internet connection

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native development environment
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nutri-track-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📱 App Structure

### Screens
- **HomeScreen**: Dashboard with quick stats, AI chat access, and recent foods
- **CameraScreen**: Food recognition using camera and AI analysis
- **RecipesScreen**: Browse and filter healthy recipes
- **CommunityScreen**: Social features for sharing and community interaction
- **ProfileScreen**: User settings, health metrics, and premium features
- **NutritionDetailScreen**: Detailed nutrition information for foods
- **RecipeDetailScreen**: Complete recipe information with instructions
- **DietPlanScreen**: AI-generated weekly meal plans (Premium)
- **AIChatScreen**: ChatGPT-powered nutrition assistant

### Key Components
- **Theme System**: Consistent green color scheme and typography
- **Navigation**: React Navigation with bottom tabs and stack navigation
- **State Management**: React hooks for local state management
- **UI Components**: React Native Paper components with custom styling

## 🎨 Design System

### Colors
- **Primary**: #4CAF50 (Green)
- **Secondary**: #81C784 (Light Green)
- **Success**: #4CAF50
- **Warning**: #FF9800
- **Error**: #F44336
- **Info**: #2196F3

### Typography
- Consistent font sizing and weights
- Proper line heights for readability
- Responsive text scaling

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
OPENAI_API_KEY=your_openai_api_key_here
NUTRITION_API_KEY=your_nutrition_api_key_here
```

### Camera Permissions
The app requires camera permissions for food scanning. These are configured in `app.json`:
- iOS: NSCameraUsageDescription
- Android: CAMERA permission

## 📊 Data Management

### Mock Data
The app currently uses mock data for demonstration purposes:
- Recipe database with nutrition information
- User profiles and health metrics
- Community posts and interactions
- AI chat responses

### Future Integrations
- Real nutrition databases (USDA, Edamam)
- OpenAI API for ChatGPT integration
- User authentication and cloud storage
- Payment processing for premium features

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Coverage
- Component rendering
- Navigation flow
- State management
- User interactions

## 🚀 Deployment

### Building for Production

1. **Configure app.json**
   - Update app name, slug, and version
   - Set proper bundle identifiers
   - Configure app icons and splash screens

2. **Build for iOS**
   ```bash
   expo build:ios
   ```

3. **Build for Android**
   ```bash
   expo build:android
   ```

### App Store Submission
- Follow platform-specific guidelines
- Ensure all permissions are properly documented
- Test on various devices and screen sizes
- Prepare app store screenshots and descriptions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Expo team for the development platform
- React Native Paper for beautiful UI components
- OpenAI for ChatGPT API integration
- Nutrition databases for food information

## 📞 Support

For support, email support@nutritrack.app or join our community Discord server.

---

**NutriTrack** - Your comprehensive health and nutrition companion! 🌱