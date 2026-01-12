# FormFriend - Form Filling Assistant App

A React Native app built with Expo that helps users fill various government and official forms in India. The app supports multiple languages (English, Hindi, Gujarati) and includes an AI-powered chatbot for guidance.

## Features

- 🌐 **Multi-language Support**: English, Hindi (हिंदी), and Gujarati (ગુજરાતી)
- 🔍 **Search Functionality**: Search through various form options
- 📱 **Online & Offline Modes**: Choose how you want to fill forms
- 🤖 **AI Chatbot**: Powered by OpenAI GPT for personalized assistance
- 📋 **Form Options**: Support for multiple form types including:
  - Passport
  - Driving License
  - Aadhar Card
  - PAN Card
  - Birth Certificate
  - Marriage Certificate
  - Ration Card
  - Voter ID
  - Bank Account
  - Insurance
  - Others (direct chatbot access)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd formfriend
```

2. Install dependencies:
```bash
npm install
```

3. Configure OpenAI API Key:
   - Open `src/config/apiConfig.js`
   - Replace `YOUR_API_KEY_HERE` with your actual OpenAI API key
   - You can get your API key from: https://platform.openai.com/api-keys

### Running the App

1. Start the Expo development server:
```bash
npm start
```

2. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

3. Or run on specific platform:
```bash
npm run android  # For Android
npm run ios      # For iOS
```

## Project Structure

```
formfriend/
├── App.js                      # Main app component with navigation
├── src/
│   ├── context/
│   │   └── LanguageContext.js  # Language and app state management
│   ├── screens/
│   │   ├── LandingScreen.js    # Language selection screen
│   │   ├── OptionsScreen.js    # Form options with search
│   │   ├── FormTypeScreen.js   # Online/Offline selection
│   │   ├── OfflineDetailsScreen.js  # Offline form details
│   │   ├── OnlineDetailsScreen.js   # Online form details
│   │   └── ChatbotScreen.js    # AI chatbot interface
│   ├── services/
│   │   ├── optionDetails.js   # Form option details data
│   │   └── chatService.js     # OpenAI API integration
│   └── config/
│       └── apiConfig.js        # API configuration
├── package.json
└── app.json
```

## App Flow

1. **Landing Screen**: User selects language (English/Hindi/Gujarati)
2. **Options Screen**: User searches and selects a form type
   - Regular options → Form Type selection
   - "Others" option → Direct to chatbot
3. **Form Type Screen**: User chooses Online or Offline mode
4. **Details Screen**: Shows required documents and scheme information
5. **Chatbot Screen**: AI assistant for form filling guidance

## Configuration

### API Key Setup

For production, consider using environment variables:

1. Install expo-constants:
```bash
npm install expo-constants
```

2. Create `app.config.js`:
```javascript
export default {
  expo: {
    // ... other config
    extra: {
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
  },
};
```

3. Update `src/config/apiConfig.js` to use:
```javascript
import Constants from 'expo-constants';
export const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiApiKey;
```

## Publishing to Google Play

1. Build the app:
```bash
expo build:android
```

2. Or use EAS Build (recommended):
```bash
npm install -g eas-cli
eas login
eas build:android
```

3. Follow the prompts to configure your app for Google Play Store

## Dependencies

- `expo`: Expo SDK
- `react-native`: React Native framework
- `@react-navigation/native`: Navigation library
- `@react-navigation/stack`: Stack navigator
- `@react-native-async-storage/async-storage`: Local storage
- `expo-linear-gradient`: Gradient backgrounds

## Notes

- The app uses OpenAI's GPT-3.5-turbo model for chatbot functionality
- Make sure to keep your API key secure and never commit it to version control
- The app is optimized for mobile devices and works with Expo Go for development

## License

[Your License Here]

