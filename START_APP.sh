#!/bin/bash

# Fix file limit issue
ulimit -n 65536

# Navigate to project
cd /Users/jayithigavva/formfriend

# Start Expo
echo "Starting Expo Metro Bundler..."
echo "Once you see the QR code and options, press 'a' to open on Android"
echo ""

npx expo start --clear


