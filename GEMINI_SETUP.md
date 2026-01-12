# 🚀 Gemini API Setup - Quick Start Guide

## ✅ Setup Complete!

Your FormFriend app is now configured to use **Google Gemini API** for live chat assistance.

---

## 📝 Next Steps

### 1. Get Your Gemini API Key

1. **Visit Google AI Studio:**
   - Go to: https://ai.google.dev/
   - Sign in with your Google account

2. **Create API Key:**
   - Click **"Get API Key"** button
   - Select an existing Google Cloud project or create a new one
   - Copy the generated API key (starts with `AIzaSy...`)

   **Alternative:** https://makersuite.google.com/app/apikey

### 2. Add Your API Key

1. **Open the config file:**
   ```
   src/config/apiConfig.js
   ```

2. **Find this line:**
   ```javascript
   export const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```

3. **Replace with your actual key:**
   ```javascript
   export const GEMINI_API_KEY = 'AIzaSy...your-actual-key-here';
   ```

4. **Save the file** - The app will automatically reload!

---

## 🎯 How It Works

- **Automatic Detection**: FormFriend automatically uses Gemini if the API key is configured
- **Fallback Support**: If Gemini is not available, it falls back to OpenAI (if configured)
- **Multilingual**: Works seamlessly with all 5 supported languages
- **Real-time**: Provides instant responses for live chat assistance

---

## 🔧 What's Been Set Up

✅ **Gemini Chat Service** (`src/services/geminiChatService.js`)
   - Handles all Gemini API communication
   - Supports conversation history
   - Multilingual support

✅ **Updated Chat Service** (`src/services/chatService.js`)
   - Auto-detects and uses Gemini when available
   - Falls back to OpenAI if needed
   - Seamless integration

✅ **Configuration File** (`src/config/apiConfig.js`)
   - Gemini API key configuration
   - Clear setup instructions

✅ **Documentation** (`API_KEY_SETUP.md`)
   - Complete setup guide
   - Troubleshooting tips

---

## 🧪 Testing

After adding your API key:

1. **Start the app:**
   ```bash
   npm start
   ```

2. **Navigate to any scheme** (e.g., Pradhan Mantri Jan Dhan Yojana)

3. **Click "Chat with AI"** or go to the chatbot screen

4. **Send a test message:**
   - "What documents do I need?"
   - "How do I apply online?"
   - "What are the benefits?"

5. **Verify the response** comes from Gemini API

---

## 🐛 Troubleshooting

### Error: "Gemini API key is not configured"
- Make sure you've replaced `YOUR_GEMINI_API_KEY_HERE` with your actual key
- Check for typos or extra spaces
- Restart the Expo server

### Error: "Invalid API key" or "403 Forbidden"
- Verify your API key is correct
- Check if the API key has proper permissions
- Ensure you're using the correct project in Google Cloud

### Error: "API Error: 429"
- You've exceeded the rate limit
- Wait a few minutes and try again
- Check your quota in Google Cloud Console

### Still using OpenAI instead of Gemini?
- Make sure `GEMINI_API_KEY` is set correctly
- Check that the key doesn't equal `'YOUR_GEMINI_API_KEY_HERE'`
- The app auto-detects, so if Gemini is configured, it will use it

---

## 📚 Additional Resources

- **Gemini API Docs**: https://ai.google.dev/docs
- **API Key Management**: https://ai.google.dev/
- **Google Cloud Console**: https://console.cloud.google.com/
- **FormFriend Setup**: See `API_KEY_SETUP.md` for detailed instructions

---

## 💡 Tips

- **Free Tier**: Gemini API has a generous free tier for development
- **Rate Limits**: Be aware of rate limits for production use
- **Security**: Never commit your API key to version control
- **Environment Variables**: Use `.env` files for production (see `API_KEY_SETUP.md`)

---

## ✨ You're All Set!

Once you add your Gemini API key, FormFriend will automatically use it for all chat interactions. Enjoy the enhanced live chat assistance powered by Google's Gemini AI! 🎉

