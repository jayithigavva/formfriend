# 🔑 API Key Setup Guide

## Where to Put Your API Keys

Your API keys go in: **`src/config/apiConfig.js`**

---

## 🤖 Google Gemini API Setup (Recommended)

FormFriend uses **Google Gemini API** for live chat assistance by default.

### Quick Setup Steps:

1. **Get your Gemini API key:**
   - Go to: https://ai.google.dev/
   - Sign in with your Google account
   - Click **"Get API Key"** button
   - Select an existing Google Cloud project or create a new one
   - Copy the generated API key

   **Alternative method:**
   - Go to: https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Click **"Create API Key"**
   - Copy the key

2. **Add the key to the app:**
   - Open: `src/config/apiConfig.js`
   - Find this line:
     ```javascript
     export const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
     ```
   - Replace `'YOUR_GEMINI_API_KEY_HERE'` with your actual key:
     ```javascript
     export const GEMINI_API_KEY = 'AIzaSy...your-actual-key-here';
     ```

3. **Save the file** - The app will automatically reload!

### What Gemini API is Used For:

✅ **Live Chat Assistance** - Real-time conversational AI support  
✅ **Government Scheme Guidance** - Help with form filling and applications  
✅ **Multilingual Support** - Works in English, Hindi, Gujarati, Telugu, and Kannada

---

## 💬 OpenAI/ChatGPT API Setup (Optional)

You can also use OpenAI API as an alternative or fallback option.

### Quick Setup Steps:

1. **Get your OpenAI API key:**
   - Go to: https://platform.openai.com/api-keys
   - Sign in or create an account
   - Click "Create new secret key"
   - Copy the key (it starts with `sk-...`)

2. **Add the key to the app:**
   - Open: `src/config/apiConfig.js`
   - Find this line:
     ```javascript
     export const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';
     ```
   - Replace `'YOUR_API_KEY_HERE'` with your actual key:
     ```javascript
     export const OPENAI_API_KEY = 'sk-your-actual-key-here';
     ```

### What OpenAI API is Used For:

✅ **ChatGPT API** - Powers chatbot conversations (if Gemini is not available)  
✅ **Whisper API** - Provides accurate voice recognition (speech-to-text)

---

## 🔄 How It Works

- **If Gemini API key is configured**: FormFriend will use Gemini for chat assistance
- **If only OpenAI API key is configured**: FormFriend will use OpenAI for chat assistance
- **If both are configured**: Gemini is used by default (faster and more cost-effective)

---

## 🔒 Security Tips

⚠️ **Never commit your API keys to Git!**

For production apps, use environment variables:

1. **Install expo-constants** (if not already installed):
   ```bash
   npm install expo-constants
   ```

2. **Create `app.config.js`** in the root directory:
   ```javascript
   export default {
     expo: {
       extra: {
         geminiApiKey: process.env.GEMINI_API_KEY,
         openaiApiKey: process.env.OPENAI_API_KEY,
       },
     },
   };
   ```

3. **Create a `.env` file** (add to `.gitignore`):
   ```
   GEMINI_API_KEY=your_gemini_key_here
   OPENAI_API_KEY=your_openai_key_here
   ```

4. **Update `src/config/apiConfig.js`** to use environment variables:
   ```javascript
   import Constants from 'expo-constants';
   const extra = Constants.expoConfig?.extra || {};
   
   export const GEMINI_API_KEY = extra.geminiApiKey || 'YOUR_GEMINI_API_KEY_HERE';
   export const OPENAI_API_KEY = extra.openaiApiKey || 'YOUR_API_KEY_HERE';
   ```

---

## ❓ Need Help?

### If you see errors about the API key:

1. **Make sure you copied the entire key** (API keys are long!)
2. **Make sure there are no extra spaces** before or after the key
3. **Make sure the key is wrapped in quotes**: `'your-key-here'`
4. **Restart the Expo server** after adding the key:
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm start
   ```

### Common Issues:

- **"API key is not configured"**: Make sure you've replaced `YOUR_GEMINI_API_KEY_HERE` with your actual key
- **"Invalid API key"**: Double-check that you copied the complete key without any spaces
- **"API Error: 403"**: Your API key might not have the right permissions or quota

### Getting Support:

- Check the API key setup in: `src/config/apiConfig.js`
- Verify your API key is active in:
  - Gemini: https://ai.google.dev/
  - OpenAI: https://platform.openai.com/api-keys

---

## 📚 Additional Resources

- **Gemini API Documentation**: https://ai.google.dev/docs
- **OpenAI API Documentation**: https://platform.openai.com/docs
- **FormFriend GitHub**: (Your repository URL)
