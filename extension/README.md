# FormFriend Chrome Extension

This is the Chrome extension version of FormFriend.

## Setup Instructions

### Option 1: Build from Expo Web (Recommended)

1. Build the web version:
```bash
cd /Users/jayithigavva/formfriend
npm run web
```

2. Once the web build is ready, you'll need to:
   - Build a production version: `npx expo export:web`
   - Copy the built files to the extension folder
   - Update paths in manifest.json

### Option 2: Create Standalone Extension

The extension folder contains the basic structure. You'll need to:

1. **Create icons**: Add icon files (16x16, 48x48, 128x128) to `extension/icons/`

2. **Build the React app**: Convert your React Native components to web-compatible React

3. **Bundle the code**: Use webpack or similar to bundle `popup.js`

## Loading the Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `extension` folder
5. The extension icon will appear in your toolbar

## Features

- Same functionality as mobile app
- Language selection (English, Hindi, Gujarati, Telugu, Kannada)
- Form options with search
- AI chatbot integration
- Offline/Online mode selection

## Notes

- The extension uses Chrome's storage API instead of AsyncStorage
- API calls need to be made from the extension's background script or popup
- Some React Native components may need web alternatives


