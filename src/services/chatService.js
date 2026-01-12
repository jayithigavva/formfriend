import { OPENAI_API_KEY, GEMINI_API_KEY } from '../config/apiConfig';
import { sendGeminiChatMessage } from './geminiChatService';

// Get system prompt based on option and form type
const getSystemPrompt = (option, formType, context, language) => {
  const optionNames = {
    passport: 'passport application',
    drivingLicense: 'driving license',
    aadhar: 'Aadhar card',
    pan: 'PAN card',
    birthCertificate: 'birth certificate',
    marriageCertificate: 'marriage certificate',
    rationCard: 'ration card',
    voterId: 'Voter ID',
    bankAccount: 'bank account',
    insurance: 'insurance',
    others: 'general form',
  };

  const optionName = optionNames[option] || 'general form';
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

  return `You are a helpful assistant for form filling in India. The user is asking about ${optionName} form filling in ${mode} mode. 

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
 * Send a chat message using AI (prefers Gemini, falls back to OpenAI)
 * @param {string} userMessage - The user's message
 * @param {string} option - The selected scheme option
 * @param {string} formType - 'online' or 'offline'
 * @param {string} context - Additional context
 * @param {string} language - Selected language
 * @param {Array} previousMessages - Previous conversation messages
 * @param {string} provider - 'gemini' or 'openai' (defaults to 'gemini' if available)
 * @returns {Promise<string>} - The AI's response
 */
export const sendChatMessage = async (
  userMessage,
  option,
  formType,
  context,
  language,
  previousMessages = [],
  provider = 'auto'
) => {
  // Auto-detect provider: prefer Gemini if available, otherwise use OpenAI
  const useProvider = provider === 'auto' 
    ? (GEMINI_API_KEY && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE' ? 'gemini' : 'openai')
    : provider;

  // Use Gemini API if selected and available
  if (useProvider === 'gemini') {
    return sendGeminiChatMessage(
      userMessage,
      option,
      formType,
      context,
      language,
      previousMessages
    );
  }

  // Fall back to OpenAI
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error('Neither Gemini nor OpenAI API key is configured. Please set GEMINI_API_KEY or OPENAI_API_KEY in src/config/apiConfig.js');
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

