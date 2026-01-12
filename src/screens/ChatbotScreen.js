import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { sendChatMessage } from '../services/chatService';
import voiceService from '../services/voiceService';

export default function ChatbotScreen({ route }) {
  const { translations, selectedOption, language } = useLanguage();
  const { option, formType, context } = route.params || { 
    option: selectedOption, 
    formType: 'offline',
    context: 'offline'
  };
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollViewRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const messagesRef = useRef([]);

  useEffect(() => {
    // Initialize with a welcome message
    const welcomeMessage = {
      id: Date.now(),
      text: `Hello! I'm here to help you with ${translations.options[option] || option} ${formType === 'offline' ? 'offline' : 'online'} form filling. How can I assist you?`,
      isUser: false,
    };
    setMessages([welcomeMessage]);
    
    // Speak the welcome message if TTS is enabled
    if (isTTSEnabled) {
      voiceService.speak(welcomeMessage.text, language).catch((err) => {
        console.error('TTS Error on welcome:', err);
        // Don't show error to user, just log it
      });
    }

    // Cleanup on unmount
    return () => {
      voiceService.stopSpeaking();
      voiceService.stopListening();
    };
  }, [option, formType, translations.options, language, isTTSEnabled]);

  // Pulse animation for listening state
  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  useEffect(() => {
    // Update ref when messages change
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    // Auto-scroll to bottom when new message is added
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = () => {
    sendMessage();
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      // Stop listening
      await voiceService.stopListening();
      setIsListening(false);
    } else {
      // Start listening
      setIsListening(true);
      try {
        await voiceService.startListening(
          (transcript) => {
            // Update input text with transcript
            setInputText(transcript);
            setIsListening(false);
            // Automatically send after a short delay if transcript is received
            if (transcript.trim()) {
              setTimeout(() => {
                // Use the transcript directly to send
                sendMessage(transcript.trim());
              }, 300);
            }
          },
          (error) => {
            console.error('Speech recognition error:', error);
            setIsListening(false);
            // Show error to user
            alert(error || 'Failed to recognize speech. Please try typing instead.');
          },
          language
        );
      } catch (error) {
        console.error('Failed to start listening:', error);
        setIsListening(false);
        alert('Voice input is not available. Please use the text input instead.');
      }
    }
  };

  const sendMessage = async (textToSend = null) => {
    const messageText = textToSend || inputText.trim();
    if (!messageText || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    
    if (!textToSend) {
      setInputText('');
    }
    setIsLoading(true);

    try {
      // Get current messages including the new user message
      const currentMessages = [...messagesRef.current, userMessage];
      
      const response = await sendChatMessage(
        messageText,
        option,
        formType,
        context,
        language,
        currentMessages
      );

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Speak the bot response if TTS is enabled
      if (isTTSEnabled) {
        setIsSpeaking(true);
        voiceService.speak(response, language)
          .then(() => setIsSpeaking(false))
          .catch((error) => {
            console.error('TTS Error:', error);
            setIsSpeaking(false);
          });
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again or check your API key configuration.',
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTTS = () => {
    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
    }
    setIsTTSEnabled(!isTTSEnabled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isUser ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.botMessageText,
                ]}
              >
                {message.text}
              </Text>
            </View>
          ))}
          {isLoading && (
            <View style={[styles.messageContainer, styles.botMessage]}>
              <ActivityIndicator size="small" color="#4A90E2" />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          {/* Voice Input Button */}
          <TouchableOpacity
            style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
            onPress={handleVoiceInput}
            disabled={isLoading || isSpeaking}
          >
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Text style={styles.voiceButtonText}>
                {isListening ? '🎤' : '🎙️'}
              </Text>
            </Animated.View>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder={translations.enterMessage || 'Type or speak your message...'}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            editable={!isLoading && !isListening}
          />
          
          {/* TTS Toggle Button */}
          <TouchableOpacity
            style={[styles.ttsButton, isTTSEnabled && styles.ttsButtonActive]}
            onPress={toggleTTS}
            disabled={isLoading}
          >
            <Text style={styles.ttsButtonText}>
              {isTTSEnabled ? '🔊' : '🔇'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sendButton, (!inputText.trim() || isLoading || isListening) && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading || isListening}
          >
            <Text style={styles.sendButtonText}>{translations.send || 'Send'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messagesContent: {
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 18,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  botMessageText: {
    color: '#1A1A1A',
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    color: '#1A1A1A',
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  voiceButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  voiceButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  voiceButtonText: {
    fontSize: 22,
  },
  ttsButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  ttsButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  ttsButtonText: {
    fontSize: 22,
  },
});

