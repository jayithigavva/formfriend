import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import voiceService from '../services/voiceService';

export default function FormTypeScreen({ navigation, route }) {
  const { translations, selectedOption, setFormType, language } = useLanguage();
  const { option } = route.params || { option: selectedOption };
  const [speakingType, setSpeakingType] = useState(null);

  const handleFormTypeSelect = (type) => {
    setFormType(type);
    if (type === 'offline') {
      navigation.navigate('OfflineDetails', { option, formType: type });
    } else {
      navigation.navigate('OnlineDetails', { option, formType: type });
    }
  };

  const handleSpeakType = async (type) => {
    if (speakingType === type) {
      voiceService.stopSpeaking();
      setSpeakingType(null);
    } else {
      if (speakingType) {
        voiceService.stopSpeaking();
      }
      const typeText = translations[type] || type;
      setSpeakingType(type);
      voiceService.speak(typeText, language)
        .then(() => setSpeakingType(null))
        .catch((error) => {
          console.error('TTS Error:', error);
          setSpeakingType(null);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{translations.howToFill}</Text>
        
        <View style={styles.optionsContainer}>
          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonFlex]}
              onPress={() => handleFormTypeSelect('online')}
            >
              <Text style={styles.optionText}>{translations.online}</Text>
              <Text style={styles.optionSubtext}>
                Fill the form online with guidance
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.speakButton, speakingType === 'online' && styles.speakButtonActive]}
              onPress={() => handleSpeakType('online')}
            >
              <Text style={styles.speakButtonText}>
                {speakingType === 'online' ? '⏸️' : '🔊'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonFlex]}
              onPress={() => handleFormTypeSelect('offline')}
            >
              <Text style={styles.optionText}>{translations.offline}</Text>
              <Text style={styles.optionSubtext}>
                Get information and fill offline
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.speakButton, speakingType === 'offline' && styles.speakButtonActive]}
              onPress={() => handleSpeakType('offline')}
            >
              <Text style={styles.speakButtonText}>
                {speakingType === 'offline' ? '⏸️' : '🔊'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 40,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  optionButtonFlex: {
    flex: 1,
  },
  optionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
  },
  optionSubtext: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  speakButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  speakButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  speakButtonText: {
    fontSize: 24,
  },
});

