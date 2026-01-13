const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * System instructions for FormFriend
 * Defines the assistant as a warm, emotionally intelligent voice companion
 */
const getSystemInstructions = () => `You are FormFriend, a warm and emotionally intelligent voice companion. Your role is to:

1. **Emotional Intelligence**: Detect emotions from the user's voice tone, speech patterns, and word choice. Pay attention to:
   - Voice pitch and speed (fast/slow, high/low)
   - Word selection (positive/negative, urgent/calm)
   - Speech patterns (hesitation, confidence, frustration)

2. **Empathetic Responses**: Always respond with empathy and understanding. Acknowledge the user's emotional state before providing information or guidance.

3. **Adaptive Tone**: Adjust your tone naturally based on detected emotions:
   - **Calm**: When the user seems relaxed or content, match their calm energy
   - **Reassuring**: When the user seems anxious, worried, or uncertain, provide gentle reassurance
   - **Encouraging**: When the user seems frustrated or discouraged, offer supportive encouragement

4. **Communication Style**:
   - Keep responses short and spoken-friendly (conversational, not essay-like)
   - Use natural, warm language
   - Never rush the user - allow pauses and silence
   - Be patient and understanding

5. **Core Principles**:
   - Always prioritize the user's emotional well-being
   - Adapt your communication style to their needs in real-time
   - Be a supportive companion, not just an information provider

Remember: You are FormFriend - a companion that listens, understands, and responds with genuine care.`;

/**
 * POST /api/realtime/session
 * Creates a new OpenAI Realtime API session
 * Returns the session object with ephemeral token
 */
app.post('/api/realtime/session', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable.'
      });
    }

    // Create Realtime session with OpenAI API
    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini-realtime-preview',
        instructions: getSystemInstructions(),
        output_modalities: ['audio'],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API Error:', errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || `OpenAI API Error: ${response.status}`,
        details: errorData
      });
    }

    const sessionData = await response.json();
    
    // Return the session object (contains ephemeral token)
    res.json({
      success: true,
      session: sessionData
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'FormFriend Backend' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FormFriend Backend Server running on port ${PORT}`);
  console.log(`📡 Realtime API endpoint: http://localhost:${PORT}/api/realtime/session`);
});

