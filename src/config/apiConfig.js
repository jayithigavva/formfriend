// ============================================
// OPENAI / CHATGPT API CONFIGURATION
// ============================================
// 
// This API key is used for:
// 1. ChatGPT API - For chatbot conversations
// 2. Whisper API - For voice recognition (speech-to-text)
//
// IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your actual OpenAI API key
// 
// How to get your API key:
// 1. Go to: https://platform.openai.com/api-keys
// 2. Sign in or create an account
// 3. Click "Create new secret key"
// 4. Copy the key and paste it below
//
// ============================================

export const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';

// ============================================
// GOOGLE GEMINI API CONFIGURATION
// ============================================
// 
// This API key is used for:
// 1. Gemini API - For live chat assistance with Google's Gemini AI
// 2. Real-time conversational AI support
//
// IMPORTANT: Replace 'YOUR_GEMINI_API_KEY_HERE' with your actual Gemini API key
// 
// How to get your Gemini API key:
// 1. Go to: https://ai.google.dev/
// 2. Sign in with your Google account
// 3. Click "Get API Key" button
// 4. Select an existing Google Cloud project or create a new one
// 5. Copy the generated API key and paste it below
//
// Alternative method:
// 1. Go to: https://makersuite.google.com/app/apikey
// 2. Sign in with your Google account
// 3. Click "Create API Key"
// 4. Copy the key and paste it below
//
// ============================================

export const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';

// ============================================
// SECURE CONFIGURATION (Recommended for Production)
// ============================================
// 
// For production apps, use environment variables:
//
// 1. Install expo-constants:
//    npm install expo-constants
//
// 2. Create app.config.js in the root directory:
//    export default {
//      expo: {
//        extra: {
//          openaiApiKey: process.env.OPENAI_API_KEY,
//        },
//      },
//    };
//
// 3. Create a .env file (add to .gitignore):
//    OPENAI_API_KEY=your_key_here
//    GEMINI_API_KEY=your_gemini_key_here
//
// 4. Update this file to use:
//    import Constants from 'expo-constants';
//    const extra = Constants.expoConfig?.extra || {};
//    export const OPENAI_API_KEY = extra.openaiApiKey || 'YOUR_API_KEY_HERE';
//    export const GEMINI_API_KEY = extra.geminiApiKey || 'YOUR_GEMINI_API_KEY_HERE';
//
// ============================================

