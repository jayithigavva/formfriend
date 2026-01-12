import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import voiceService from '../services/voiceService';

const OPTIONS = [
  'pmJanDhan',
  'pmAwas',
  'ayushmanBharat',
  'mgnrega',
  'pmUjjwala',
  'betiBachao',
  'pmKisan',
  'nfsa',
  'swachhBharat',
  'pmMudra',
];

export default function OptionsScreen({ navigation }) {
  const { translations, setSelectedOption, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingOption, setSpeakingOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // For "others" option, go directly to chatbot
    if (option === 'others') {
      navigation.navigate('Chatbot', { 
        option: 'others', 
        formType: 'general',
        context: 'general'
      });
    } else {
      navigation.navigate('FormType', { option });
    }
  };

  const handleSpeakOption = async (option) => {
    if (speakingOption === option) {
      voiceService.stopSpeaking();
      setSpeakingOption(null);
    } else {
      if (speakingOption) {
        voiceService.stopSpeaking();
      }
      const optionText = option === 'others' 
        ? translations.others 
        : (translations.options[option] || option);
      setSpeakingOption(option);
      voiceService.speak(optionText, language)
        .then(() => setSpeakingOption(null))
        .catch((error) => {
          console.error('TTS Error:', error);
          setSpeakingOption(null);
        });
    }
  };

  const filteredOptions = OPTIONS.filter((option) =>
    translations.options[option]
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={translations.search}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{translations.selectOption}</Text>

        {filteredOptions.map((option) => (
          <View key={option} style={styles.optionRow}>
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonFlex]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.optionText}>{translations.options[option]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.speakButton, speakingOption === option && styles.speakButtonActive]}
              onPress={() => handleSpeakOption(option)}
            >
              <Text style={styles.speakButtonText}>
                {speakingOption === option ? '⏸️' : '🔊'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[styles.optionButton, styles.othersButton, styles.optionButtonFlex]}
            onPress={() => handleOptionSelect('others')}
          >
            <Text style={styles.optionText}>{translations.others}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.speakButton, speakingOption === 'others' && styles.speakButtonActive]}
            onPress={() => handleSpeakOption('others')}
          >
            <Text style={styles.speakButtonText}>
              {speakingOption === 'others' ? '⏸️' : '🔊'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchInput: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  optionButtonFlex: {
    flex: 1,
  },
  othersButton: {
    backgroundColor: '#E8F4F8',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  optionText: {
    fontSize: 17,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  speakButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
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
    elevation: 5,
  },
  speakButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  speakButtonText: {
    fontSize: 22,
  },
});

