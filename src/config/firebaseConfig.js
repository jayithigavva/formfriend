// ============================================
// FIREBASE REALTIME DATABASE CONFIGURATION
// ============================================
// 
// This configuration is used for:
// 1. Live chat assistance with real-time messaging
// 2. Real-time synchronization of chat messages
//
// IMPORTANT: Replace the configuration values with your Firebase project credentials
// 
// How to get your Firebase configuration:
// 1. Go to: https://console.firebase.google.com/
// 2. Create a new project or select an existing one
// 3. Click on the gear icon (⚙️) next to "Project Overview"
// 4. Select "Project settings"
// 5. Scroll down to "Your apps" section
// 6. Click on the web icon (</>) to add a web app
// 7. Register your app and copy the configuration
// 8. Enable Realtime Database:
//    - Go to "Realtime Database" in the left sidebar
//    - Click "Create Database"
//    - Choose a location (e.g., us-central1)
//    - Start in test mode (you can secure it later)
//
// ============================================

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ============================================
// SECURE CONFIGURATION (Recommended for Production)
// ============================================
// 
// For production apps, use environment variables:
//
// 1. Create app.config.js in the root directory:
//    export default {
//      expo: {
//        extra: {
//          firebaseApiKey: process.env.FIREBASE_API_KEY,
//          firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
//          firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
//          firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
//          firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//          firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//          firebaseAppId: process.env.FIREBASE_APP_ID,
//        },
//      },
//    };
//
// 2. Create a .env file (add to .gitignore):
//    FIREBASE_API_KEY=your_api_key
//    FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
//    FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
//    FIREBASE_PROJECT_ID=your_project_id
//    FIREBASE_STORAGE_BUCKET=your_project.appspot.com
//    FIREBASE_MESSAGING_SENDER_ID=your_sender_id
//    FIREBASE_APP_ID=your_app_id
//
// 3. Update this file to use:
//    import Constants from 'expo-constants';
//    const extra = Constants.expoConfig?.extra || {};
//    export const firebaseConfig = {
//      apiKey: extra.firebaseApiKey || 'YOUR_API_KEY_HERE',
//      authDomain: extra.firebaseAuthDomain || 'YOUR_AUTH_DOMAIN',
//      databaseURL: extra.firebaseDatabaseURL || 'YOUR_DATABASE_URL',
//      projectId: extra.firebaseProjectId || 'YOUR_PROJECT_ID',
//      storageBucket: extra.firebaseStorageBucket || 'YOUR_STORAGE_BUCKET',
//      messagingSenderId: extra.firebaseMessagingSenderId || 'YOUR_SENDER_ID',
//      appId: extra.firebaseAppId || 'YOUR_APP_ID',
//    };
//
// ============================================

