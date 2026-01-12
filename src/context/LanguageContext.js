import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');
  const [selectedOption, setSelectedOption] = useState(null);
  const [formType, setFormType] = useState(null);

  const translations = {
    english: {
      welcome: 'Welcome to FormFriend',
      selectLanguage: 'Select Your Language',
      search: 'Search',
      selectOption: 'Select a Government Scheme',
      others: 'Others',
      howToFill: 'How do you want to apply for this scheme?',
      online: 'Online',
      offline: 'Offline',
      thingsYouNeed: 'Things You Need',
      schemeProvides: 'What Does the Scheme Provide',
      aiBot: 'AI Assistant',
      chatWithAI: 'Chat with AI',
      enterMessage: 'Type or speak your message...',
      send: 'Send',
      loading: 'Loading...',
      listening: 'Listening...',
      speaking: 'Speaking...',
      voiceInput: 'Voice Input',
      textToSpeech: 'Text to Speech',
      tapToSpeak: 'Tap to speak',
      tapToStop: 'Tap to stop',
      options: {
        pmJanDhan: 'Pradhan Mantri Jan Dhan Yojana',
        pmAwas: 'Pradhan Mantri Awas Yojana',
        ayushmanBharat: 'Ayushman Bharat – PM Jan Arogya Yojana',
        mgnrega: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
        pmUjjwala: 'Pradhan Mantri Ujjwala Yojana',
        betiBachao: 'Beti Bachao Beti Padhao',
        pmKisan: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        nfsa: 'National Food Security Act (NFSA)',
        swachhBharat: 'Swachh Bharat Mission',
        pmMudra: 'Pradhan Mantri Mudra Yojana',
      }
    },
    hindi: {
      welcome: 'FormFriend में आपका स्वागत है',
      selectLanguage: 'अपनी भाषा चुनें',
      search: 'खोजें',
      selectOption: 'एक सरकारी योजना चुनें',
      others: 'अन्य',
      howToFill: 'आप इस योजना के लिए कैसे आवेदन करना चाहते हैं?',
      online: 'ऑनलाइन',
      offline: 'ऑफलाइन',
      thingsYouNeed: 'आपको क्या चाहिए',
      schemeProvides: 'योजना क्या प्रदान करती है',
      aiBot: 'AI सहायक',
      chatWithAI: 'AI के साथ चैट करें',
      enterMessage: 'अपना संदेश टाइप करें या बोलें...',
      send: 'भेजें',
      loading: 'लोड हो रहा है...',
      listening: 'सुन रहा हूं...',
      speaking: 'बोल रहा हूं...',
      voiceInput: 'आवाज इनपुट',
      textToSpeech: 'टेक्स्ट टू स्पीच',
      tapToSpeak: 'बोलने के लिए टैप करें',
      tapToStop: 'रोकने के लिए टैप करें',
      options: {
        pmJanDhan: 'प्रधानमंत्री जन धन योजना',
        pmAwas: 'प्रधानमंत्री आवास योजना',
        ayushmanBharat: 'आयुष्मान भारत – PM जन आरोग्य योजना',
        mgnrega: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (MGNREGA)',
        pmUjjwala: 'प्रधानमंत्री उज्ज्वला योजना',
        betiBachao: 'बेटी बचाओ बेटी पढ़ाओ',
        pmKisan: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
        nfsa: 'राष्ट्रीय खाद्य सुरक्षा अधिनियम (NFSA)',
        swachhBharat: 'स्वच्छ भारत मिशन',
        pmMudra: 'प्रधानमंत्री मुद्रा योजना',
      }
    },
    gujarati: {
      welcome: 'FormFriend માં આપનું સ્વાગત છે',
      selectLanguage: 'તમારી ભાષા પસંદ કરો',
      search: 'શોધો',
      selectOption: 'એક સરકારી યોજના પસંદ કરો',
      others: 'અન્ય',
      howToFill: 'તમે આ યોજના માટે કેવી રીતે અરજી કરવા માંગો છો?',
      online: 'ઓનલાઇન',
      offline: 'ઓફલાઇન',
      thingsYouNeed: 'તમારે શું જોઈએ છે',
      schemeProvides: 'યોજના શું પ્રદાન કરે છે',
      aiBot: 'AI સહાયક',
      chatWithAI: 'AI સાથે ચેટ કરો',
      enterMessage: 'તમારો સંદેશ ટાઇપ કરો અથવા બોલો...',
      send: 'મોકલો',
      loading: 'લોડ થઈ રહ્યું છે...',
      listening: 'સાંભળી રહ્યું છું...',
      speaking: 'બોલી રહ્યું છું...',
      voiceInput: 'અવાજ ઇનપુટ',
      textToSpeech: 'ટેક્સ્ટ ટુ સ્પીચ',
      tapToSpeak: 'બોલવા માટે ટેપ કરો',
      tapToStop: 'બંધ કરવા માટે ટેપ કરો',
      options: {
        pmJanDhan: 'પ્રધાનમંત્રી જન ધન યોજના',
        pmAwas: 'પ્રધાનમંત્રી આવાસ યોજના',
        ayushmanBharat: 'આયુષ્માન ભારત – PM જન આરોગ્ય યોજના',
        mgnrega: 'મહાત્મા ગાંધી રાષ્ટ્રીય ગ્રામીણ રોજગાર ગેરંટી અધિનિયમ (MGNREGA)',
        pmUjjwala: 'પ્રધાનમંત્રી ઉજ્જ્વલા યોજના',
        betiBachao: 'બેટી બચાઓ બેટી પઢાઓ',
        pmKisan: 'પ્રધાનમંત્રી કિસાન સમ્માન નિધિ (PM-KISAN)',
        nfsa: 'રાષ્ટ્રીય ખાદ્ય સુરક્ષા અધિનિયમ (NFSA)',
        swachhBharat: 'સ્વચ્છ ભારત મિશન',
        pmMudra: 'પ્રધાનમંત્રી મુદ્રા યોજના',
      }
    },
    telugu: {
      welcome: 'FormFriend కు స్వాగతం',
      selectLanguage: 'మీ భాషను ఎంచుకోండి',
      search: 'శోధించు',
      selectOption: 'ఒక ప్రభుత్వ పథకాన్ని ఎంచుకోండి',
      others: 'ఇతరులు',
      howToFill: 'మీరు ఈ పథకానికి ఎలా దరఖాస్తు చేయాలనుకుంటున్నారు?',
      online: 'ఆన్‌లైన్',
      offline: 'ఆఫ్‌లైన్',
      thingsYouNeed: 'మీకు ఏమి కావాలి',
      schemeProvides: 'స్కీమ్ ఏమి అందిస్తుంది',
      aiBot: 'AI సహాయకుడు',
      chatWithAI: 'AI తో చాట్ చేయండి',
      enterMessage: 'మీ సందేశాన్ని టైప్ చేయండి లేదా మాట్లాడండి...',
      send: 'పంపండి',
      loading: 'లోడ్ అవుతోంది...',
      listening: 'వినడం...',
      speaking: 'మాట్లాడుతోంది...',
      voiceInput: 'వాయిస్ ఇన్పుట్',
      textToSpeech: 'టెక్స్ట్ టు స్పీచ్',
      tapToSpeak: 'మాట్లాడడానికి టాప్ చేయండి',
      tapToStop: 'ఆపడానికి టాప్ చేయండి',
      options: {
        pmJanDhan: 'ప్రధానమంత్రి జన్ ధన్ యోజన',
        pmAwas: 'ప్రధానమంత్రి ఆవాస్ యోజన',
        ayushmanBharat: 'ఆయుష్మాన్ భారత్ – PM జన్ ఆరోగ్య యోజన',
        mgnrega: 'మహాత్మా గాంధీ జాతీయ గ్రామీణ ఉపాధి హామీ చట్టం (MGNREGA)',
        pmUjjwala: 'ప్రధానమంత్రి ఉజ్జ్వల యోజన',
        betiBachao: 'బేటీ బచావో బేటీ పఢావో',
        pmKisan: 'ప్రధానమంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
        nfsa: 'జాతీయ ఆహార భద్రతా చట్టం (NFSA)',
        swachhBharat: 'స్వచ్ఛ్ భారత్ మిషన్',
        pmMudra: 'ప్రధానమంత్రి ముద్ర యోజన',
      }
    },
    kannada: {
      welcome: 'FormFriend ಗೆ ಸ್ವಾಗತ',
      selectLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      search: 'ಹುಡುಕಿ',
      selectOption: 'ಒಂದು ಸರ್ಕಾರಿ ಯೋಜನೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      others: 'ಇತರರು',
      howToFill: 'ನೀವು ಈ ಯೋಜನೆಗೆ ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಬಯಸುತ್ತೀರಿ?',
      online: 'ಆನ್‌ಲೈನ್',
      offline: 'ಆಫ್‌ಲೈನ್',
      thingsYouNeed: 'ನಿಮಗೆ ಏನು ಬೇಕು',
      schemeProvides: 'ಯೋಜನೆ ಏನು ಒದಗಿಸುತ್ತದೆ',
      aiBot: 'AI ಸಹಾಯಕ',
      chatWithAI: 'AI ಜೊತೆ ಚಾಟ್ ಮಾಡಿ',
      enterMessage: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮಾತನಾಡಿ...',
      send: 'ಕಳುಹಿಸಿ',
      loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      listening: 'ಕೇಳುತ್ತಿದೆ...',
      speaking: 'ಮಾತನಾಡುತ್ತಿದೆ...',
      voiceInput: 'ಧ್ವನಿ ಇನ್ಪುಟ್',
      textToSpeech: 'ಟೆಕ್ಸ್ಟ್ ಟು ಸ್ಪೀಚ್',
      tapToSpeak: 'ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
      tapToStop: 'ನಿಲ್ಲಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
      options: {
        pmJanDhan: 'ಪ್ರಧಾನಮಂತ್ರಿ ಜನ್ ಧನ್ ಯೋಜನೆ',
        pmAwas: 'ಪ್ರಧಾನಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ',
        ayushmanBharat: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ – PM ಜನ್ ಆರೋಗ್ಯ ಯೋಜನೆ',
        mgnrega: 'ಮಹಾತ್ಮಾ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಉದ್ಯೋಗ ಖಾತರಿ ಕಾಯಿದೆ (MGNREGA)',
        pmUjjwala: 'ಪ್ರಧಾನಮಂತ್ರಿ ಉಜ್ಜ್ವಲ ಯೋಜನೆ',
        betiBachao: 'ಬೇಟಿ ಬಚಾವೋ ಬೇಟಿ ಪಢಾವೋ',
        pmKisan: 'ಪ್ರಧಾನಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN)',
        nfsa: 'ರಾಷ್ಟ್ರೀಯ ಆಹಾರ ಭದ್ರತಾ ಕಾಯಿದೆ (NFSA)',
        swachhBharat: 'ಸ್ವಚ್ಛ್ ಭಾರತ್ ಮಿಷನ್',
        pmMudra: 'ಪ್ರಧಾನಮಂತ್ರಿ ಮುದ್ರಾ ಯೋಜನೆ',
      }
    }
  };

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    await AsyncStorage.setItem('language', lang);
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        translations: translations[language],
        t,
        selectedOption,
        setSelectedOption,
        formType,
        setFormType,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

