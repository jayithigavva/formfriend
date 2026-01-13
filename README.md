# FormFriend - Real-Time Emotional Voice Chatbot

A React Native app built with Expo featuring a real-time emotional voice chatbot powered by OpenAI Realtime API. FormFriend helps users fill various government and official forms in India with an AI companion that adapts its tone based on detected emotions.

## Features

- 🎤 **Real-Time Voice Chat**: Powered by OpenAI Realtime API with audio input and output
- 🧠 **Emotional Intelligence**: Detects emotions from voice tone and word choice, responding empathetically
- 🎭 **Adaptive Tone**: Automatically adjusts between calm, reassuring, and encouraging tones
- 🌐 **Multi-language Support**: English, Hindi (हिंदी), and Gujarati (ગુજરાતી)
- 🔍 **Search Functionality**: Search through various form options
- 📱 **Online & Offline Modes**: Choose how you want to fill forms
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

## Architecture

### Frontend (React Native/Expo)
- React Native app with Expo
- Multi-screen navigation
- Voice interface integration

### Backend (Node.js/Express)
- Express server providing secure API endpoints
- OpenAI Realtime API session management
- API key protection (never exposed to frontend)

## Prerequisites

- Node.js (v18 or higher recommended for native fetch support)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- OpenAI API key with access to Realtime API
- Expo Go app on your mobile device (for testing)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd formfriend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```
   - **Important**: Never commit your `.env` file to version control

## Running the Application

### Start the Backend Server

The backend server provides the OpenAI Realtime API session endpoint:

```bash
npm run server
```

The server will start on `http://localhost:3001` (or the port specified in your `.env` file).

**Available Endpoints:**
- `POST /api/realtime/session` - Creates a new OpenAI Realtime session
- `GET /health` - Health check endpoint

### Start the Frontend App

In a separate terminal:

```bash
npm start
```

Then:
- Scan the QR code with:
  - **iOS**: Camera app
  - **Android**: Expo Go app
- Or run on specific platform:
  ```bash
  npm run android  # For Android
  npm run ios      # For iOS
  ```

## Project Structure

```
formfriend/
├── server.js                    # Backend Express server
├── App.js                       # Main app component with navigation
├── index.js                     # App entry point
├── package.json                 # Dependencies and scripts
├── .env                         # Environment variables (not in git)
├── src/
│   ├── config/
│   │   ├── apiConfig.js         # API configuration
│   │   └── firebaseConfig.js    # Firebase configuration (optional)
│   ├── context/
│   │   └── LanguageContext.js   # Language and app state management
│   ├── screens/
│   │   ├── LandingScreen.js     # Language selection screen
│   │   ├── OptionsScreen.js     # Form options with search
│   │   ├── FormTypeScreen.js    # Online/Offline selection
│   │   ├── OfflineDetailsScreen.js  # Offline form details
│   │   ├── OnlineDetailsScreen.js   # Online form details
│   │   └── ChatbotScreen.js     # AI chatbot interface
│   └── services/
│       ├── optionDetails.js     # Form option details data
│       ├── chatService.js       # OpenAI Chat API integration
│       ├── realtimeChatService.js  # Firebase Realtime integration (optional)
│       ├── voiceService.js      # Voice service utilities
│       └── whisperService.js    # Whisper API integration
└── README.md
```

## App Flow

1. **Landing Screen**: User selects language (English/Hindi/Gujarati)
2. **Options Screen**: User searches and selects a form type
   - Regular options → Form Type selection
   - "Others" option → Direct to chatbot
3. **Form Type Screen**: User chooses Online or Offline mode
4. **Details Screen**: Shows required documents and scheme information
5. **Chatbot Screen**: Real-time voice AI assistant with emotional intelligence

## OpenAI Realtime API Setup

FormFriend uses OpenAI's Realtime API with the `gpt-4o-mini-realtime-preview` model for real-time voice conversations.

### Backend Configuration

The backend server (`server.js`) handles:
- Creating Realtime API sessions
- Securing API keys (never exposed to frontend)
- Returning ephemeral tokens to the frontend

### System Instructions

FormFriend is configured with system instructions that enable:
- **Emotional Intelligence**: Detects emotions from voice tone, speech patterns, and word choice
- **Empathetic Responses**: Acknowledges user's emotional state before providing guidance
- **Adaptive Tone**: Adjusts between calm, reassuring, and encouraging tones
- **Natural Communication**: Keeps responses short, spoken-friendly, and never rushes the user

## API Key Security

⚠️ **Important Security Notes:**

- API keys are stored in environment variables (`.env` file)
- The `.env` file is already in `.gitignore` - never commit it
- The backend server keeps API keys secure and never exposes them to the frontend
- Frontend receives only ephemeral tokens from the backend

## Dependencies

### Frontend
- `expo`: Expo SDK
- `react-native`: React Native framework
- `@react-navigation/native`: Navigation library
- `@react-navigation/stack`: Stack navigator
- `@react-native-async-storage/async-storage`: Local storage
- `expo-av`: Audio/video capabilities
- `expo-speech`: Text-to-speech
- `firebase`: Firebase integration (optional)

### Backend
- `express`: Web server framework
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management

## Development

### Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=sk-your-key-here
PORT=3001
```

### Scripts

- `npm start` - Start Expo development server
- `npm run server` - Start backend Express server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web

## Notes

- The app uses OpenAI's `gpt-4o-mini-realtime-preview` model for voice conversations
- Make sure to keep your API key secure and never commit it to version control
- The app is optimized for mobile devices and works with Expo Go for development
- Backend server must be running for Realtime API functionality

## License

[Your License Here]
