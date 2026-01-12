import { GEMINI_API_KEY } from '../config/apiConfig';

// Get system instruction based on option and form type
const getSystemInstruction = (option, formType, context, language) => {
  const optionNames = {
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
    others: 'general government scheme',
  };

  const optionName = optionNames[option] || 'general government scheme';
  const mode = formType === 'offline' ? 'offline' : 'online';
  
  const languageInstruction = language === 'hindi' 
    ? 'Respond in Hindi (हिंदी).' 
    : language === 'gujarati' 
    ? 'Respond in Gujarati (ગુજરાતી).'
    : language === 'telugu'
    ? 'Respond in Telugu (తెలుగు).'
    : language === 'kannada'
    ? 'Respond in Kannada (ಕನ್ನಡ).'
    : 'Respond in English.';

  return `You are a helpful assistant for government scheme applications in India. The user is asking about ${optionName} scheme application in ${mode} mode. 

${languageInstruction}

Provide clear, step-by-step guidance. Be concise and helpful. Answer questions about:
- Required documents
- Application process
- Common mistakes to avoid
- Where to submit applications
- Processing time
- Fees involved (if any)
- Eligibility criteria
- Benefits of the scheme

Keep responses practical and easy to understand.`;
};

/**
 * Send a chat message using Google Gemini API
 * @param {string} userMessage - The user's message
 * @param {string} option - The selected scheme option
 * @param {string} formType - 'online' or 'offline'
 * @param {string} context - Additional context
 * @param {string} language - Selected language
 * @param {Array} previousMessages - Previous conversation messages
 * @returns {Promise<string>} - The AI's response
 */
export const sendGeminiChatMessage = async (
  userMessage,
  option,
  formType,
  context,
  language,
  previousMessages = []
) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in src/config/apiConfig.js');
  }

  const systemInstruction = getSystemInstruction(option, formType, context, language);

  // Format conversation history for Gemini
  // Gemini uses parts array format
  const conversationHistory = previousMessages.slice(-10).flatMap(msg => {
    if (msg.isUser) {
      return [{ role: 'user', parts: [{ text: msg.text }] }];
    } else {
      return [{ role: 'model', parts: [{ text: msg.text }] }];
    }
  });

  // Add current user message
  conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: conversationHistory,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `Gemini API Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    
    // Extract the response text from Gemini's response structure
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('No response generated from Gemini API');
    }

    return responseText;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};

