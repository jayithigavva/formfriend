#!/bin/bash

echo "🚀 Starting FormFriend App..."
echo ""

# Set file limit
ulimit -n 65536

# Check if emulator is running
echo "📱 Checking Android emulator..."
adb devices

# Navigate to project
cd /Users/jayithigavva/formfriend

# Clear cache
echo ""
echo "🧹 Clearing cache..."
rm -rf .expo node_modules/.cache

# Start Expo
echo ""
echo "▶️  Starting Expo Metro Bundler..."
echo "   (You'll see all output here)"
echo ""
npx expo start --android --clear

