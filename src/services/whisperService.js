import { OPENAI_API_KEY } from '../config/apiConfig';
import { Audio } from 'expo-av';

/**
 * OpenAI Whisper API Service for Speech-to-Text
 * This provides better accuracy than Web Speech API
 * 
 * To use this, you need:
 * 1. OpenAI API key configured in src/config/apiConfig.js
 * 2. Audio recording permissions
 */
class WhisperService {
  constructor() {
    this.recording = null;
  }

  /**
   * Convert audio to text using OpenAI Whisper API
   * @param {string} audioUri - URI of the recorded audio file
   * @param {string} language - Language code (e.g., 'en', 'hi', 'gu')
   * @returns {Promise<string>} - Transcribed text
   */
  async transcribeAudio(audioUri, language = 'en') {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'YOUR_API_KEY_HERE') {
      throw new Error('OpenAI API key is not configured. Please set it in src/config/apiConfig.js');
    }

    try {
      // Read the audio file
      const formData = new FormData();
      
      // For React Native, we need to convert the URI to a file
      // Determine file extension from URI
      const fileExtension = audioUri.split('.').pop() || 'm4a';
      const mimeType = fileExtension === 'm4a' ? 'audio/m4a' : 
                      fileExtension === 'mp3' ? 'audio/mp3' :
                      fileExtension === 'wav' ? 'audio/wav' : 'audio/m4a';
      
      // FormData in React Native requires this format
      formData.append('file', {
        uri: audioUri,
        type: mimeType,
        name: `recording.${fileExtension}`,
      });
      formData.append('model', 'whisper-1');
      formData.append('language', this.getLanguageCode(language));

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.text || '';
    } catch (error) {
      console.error('Whisper API Error:', error);
      throw error;
    }
  }

  /**
   * Record audio and transcribe it
   * @param {Function} onTranscript - Callback with transcribed text
   * @param {Function} onError - Callback for errors
   * @param {string} language - Language code
   */
  async recordAndTranscribe(onTranscript, onError, language = 'english') {
    try {
      // Request permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        onError('Microphone permission not granted');
        return;
      }

      // Set audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Create and start recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      this.recording = recording;

      // Return a function to stop recording and transcribe
      return async () => {
        try {
          await this.recording.stopAndUnloadAsync();
          const uri = this.recording.getURI();
          this.recording = null;

          // Transcribe using Whisper API
          const transcript = await this.transcribeAudio(uri, language);
          if (transcript.trim()) {
            onTranscript(transcript.trim());
          } else {
            onError('No speech detected. Please try again.');
          }
        } catch (error) {
          this.recording = null;
          onError(error.message || 'Failed to transcribe audio');
        }
      };
    } catch (error) {
      onError(error.message || 'Failed to start recording');
    }
  }

  getLanguageCode(language) {
    const languageMap = {
      english: 'en',
      hindi: 'hi',
      gujarati: 'gu',
      telugu: 'te',
      kannada: 'kn',
    };
    return languageMap[language] || 'en';
  }
}

export default new WhisperService();

