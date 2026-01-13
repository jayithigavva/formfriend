import { OPENAI_API_KEY } from '../config/apiConfig';

// Get system prompt based on option and form type
const getSystemPrompt = (option, formType, context, language) => {
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
- Form filling process
- Common mistakes to avoid
- Where to submit
- Processing time
- Fees involved

Keep responses practical and easy to understand.`;
};

/**
 * Send a chat message using OpenAI ChatGPT API
 * @param {string} userMessage - The user's message
 * @param {string} option - The selected scheme option
 * @param {string} formType - 'online' or 'offline'
 * @param {string} context - Additional context
 * @param {string} language - Selected language
 * @param {Array} previousMessages - Previous conversation messages
 * @returns {Promise<string>} - The AI's response
 */
export const sendChatMessage = async (
  userMessage,
  option,
  formType,
  context,
  language,
  previousMessages = []
) => {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error('OpenAI API key is not configured. Please set OPENAI_API_KEY in src/config/apiConfig.js');
  }

  const systemPrompt = getSystemPrompt(option, formType, context, language);

  // Format previous messages for context
  const messages = [
    { role: 'system', content: systemPrompt },
    ...previousMessages.slice(-10).map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text,
    })),
    { role: 'user', content: userMessage },
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
};

