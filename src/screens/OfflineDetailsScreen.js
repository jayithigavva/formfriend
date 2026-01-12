import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { getOptionDetails } from '../services/optionDetails';

export default function OfflineDetailsScreen({ navigation, route }) {
  const { translations, selectedOption, language } = useLanguage();
  const { option } = route.params || { option: selectedOption };
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      const optionDetails = getOptionDetails(option, language);
      setDetails(optionDetails);
    };
    loadDetails();
  }, [option, language]);

  const handleAIBotPress = () => {
    navigation.navigate('Chatbot', { 
      option, 
      formType: 'offline',
      context: 'offline'
    });
  };

  if (!details) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{translations.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translations.thingsYouNeed}</Text>
          <View style={styles.listContainer}>
            {details.thingsYouNeed.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translations.schemeProvides}</Text>
          <View style={styles.listContainer}>
            {details.schemeProvides.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.aiButton}
          onPress={handleAIBotPress}
        >
          <Text style={styles.aiButtonText}>{translations.aiBot}</Text>
          <Text style={styles.aiButtonSubtext}>{translations.chatWithAI}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 15,
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 18,
    color: '#4A90E2',
    marginRight: 10,
    marginTop: 2,
  },
  listText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 24,
  },
  aiButton: {
    backgroundColor: '#4A90E2',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aiButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  aiButtonSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});

