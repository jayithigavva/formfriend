import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import whisperService from './whisperService';
import { OPENAI_API_KEY } from '../config/apiConfig';

class VoiceService {
  constructor() {
    this.isSpeaking = false;
    this.isListening = false;
    this.recording = null;
    this.sound = null;
    this.recognition = null;
    this.onTranscriptCallback = null;
    this.onErrorCallback = null;
  }

  // Text-to-Speech
  async speak(text, language = 'en', options = {}) {
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return Promise.resolve();
    }

    if (this.isSpeaking) {
      await this.stopSpeaking();
    }

    return new Promise((resolve, reject) => {
      try {
        this.isSpeaking = true;
        
        const speechOptions = {
          language: this.getLanguageCode(language),
          pitch: options.pitch || 1.0,
          rate: options.rate || 0.9,
          volume: options.volume || 1.0,
          onDone: () => {
            this.isSpeaking = false;
            resolve();
          },
          onStopped: () => {
            this.isSpeaking = false;
            resolve();
          },
          onError: (error) => {
            this.isSpeaking = false;
            console.error('Speech error:', error);
            // Don't reject, just resolve to prevent app crashes
            resolve();
          },
        };

        Speech.speak(text, speechOptions);
      } catch (error) {
        this.isSpeaking = false;
        console.error('Speech speak error:', error);
        // Don't reject, just resolve to prevent app crashes
        resolve();
      }
    });
  }

  stopSpeaking() {
    if (this.isSpeaking) {
      Speech.stop();
      this.isSpeaking = false;
    }
  }

  // Speech-to-Text using Web Speech API (for web) or expo-av (for native)
  async startListening(onTranscript, onError, language = 'english') {
    if (this.isListening) {
      await this.stopListening();
    }

    this.onTranscriptCallback = onTranscript;
    this.onErrorCallback = onError;
    this.language = language;

    // For web platform, use Web Speech API
    if (Platform.OS === 'web') {
      return this.startWebSpeechRecognition(onTranscript, onError, language);
    } else {
      // For native platforms, use Whisper API if available, else basic recording
      return this.startNativeRecording(onTranscript, onError, language);
    }
  }

  async startWebSpeechRecognition(onTranscript, onError, language = 'english') {
    if (Platform.OS !== 'web') {
      onError('Web speech recognition is only available on web platform.');
      return;
    }
    
    if (typeof window === 'undefined' || (!window.webkitSpeechRecognition && !window.SpeechRecognition)) {
      onError('Speech recognition is not supported on this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = this.getLanguageCode(language);

    this.recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript.trim()) {
        onTranscript(transcript.trim());
      }
    };

    this.recognition.onerror = (event) => {
      onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    this.recognition.start();
    this.isListening = true;
  }

  async startNativeRecording(onTranscript, onError, language = 'english') {
    try {
      // Check if OpenAI API key is configured for Whisper API
      const useWhisper = OPENAI_API_KEY && OPENAI_API_KEY !== 'YOUR_API_KEY_HERE';
      
      if (useWhisper) {
        // Use OpenAI Whisper API for better accuracy
        const stopRecording = await whisperService.recordAndTranscribe(
          onTranscript,
          onError,
          language
        );
        
        if (stopRecording) {
          this.stopRecordingFn = stopRecording;
          this.isListening = true;
        }
      } else {
        // Fallback to basic recording (user will need to manually process)
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          onError('Microphone permission not granted');
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );

        this.recording = recording;
        this.isListening = true;
        this.onTranscriptCallback = onTranscript;
        this.onErrorCallback = onError;
      }
    } catch (error) {
      this.isListening = false;
      onError(error.message || 'Failed to start recording');
    }
  }

  async stopListening() {
    if (Platform.OS === 'web' && this.recognition) {
      if (this.isListening) {
        this.recognition.stop();
        this.recognition = null;
      }
    } else if (this.stopRecordingFn) {
      // Use Whisper API to transcribe
      try {
        await this.stopRecordingFn();
      } catch (error) {
        if (this.onErrorCallback) {
          this.onErrorCallback(error.message);
        }
      }
      this.stopRecordingFn = null;
    } else if (this.recording) {
      try {
        await this.recording.stopAndUnloadAsync();
        const uri = this.recording.getURI();
        this.recording = null;
        
        // If no Whisper API, show message to user
        if (this.onErrorCallback) {
          this.onErrorCallback('Voice recognition requires OpenAI API key. Please configure it in src/config/apiConfig.js or use text input.');
        }
      } catch (error) {
        if (this.onErrorCallback) {
          this.onErrorCallback(error.message);
        }
      }
    }
    this.isListening = false;
  }

  getLanguageCode(language) {
    const languageMap = {
      english: 'en-US',
      hindi: 'hi-IN',
      gujarati: 'gu-IN',
      telugu: 'te-IN',
      kannada: 'kn-IN',
    };
    return languageMap[language] || 'en-US';
  }

  // Check if speech recognition is available
  isSpeechRecognitionAvailable() {
    if (Platform.OS === 'web') {
      return typeof window !== 'undefined' && 
             ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
    }
    // For native, we'll use recording as a workaround
    return true;
  }
}

export default new VoiceService();

