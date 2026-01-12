import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../context/LanguageContext';

export default function LandingScreen({ navigation }) {
  const { changeLanguage, translations } = useLanguage();

  const handleLanguageSelect = (language) => {
    changeLanguage(language);
    navigation.navigate('Options');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#357ABD']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.welcomeText}>{translations.welcome}</Text>
          <Text style={styles.subtitleText}>{translations.selectLanguage}</Text>

          <View style={styles.languageContainer}>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => handleLanguageSelect('english')}
            >
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => handleLanguageSelect('hindi')}
            >
              <Text style={styles.languageText}>हिंदी</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => handleLanguageSelect('gujarati')}
            >
              <Text style={styles.languageText}>ગુજરાતી</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => handleLanguageSelect('telugu')}
            >
              <Text style={styles.languageText}>తెలుగు</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => handleLanguageSelect('kannada')}
            >
              <Text style={styles.languageText}>ಕನ್ನಡ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 50,
    textAlign: 'center',
  },
  languageContainer: {
    width: '100%',
    maxWidth: 300,
  },
  languageButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  languageText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A90E2',
  },
});

