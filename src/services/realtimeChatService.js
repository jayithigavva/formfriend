import { firebaseConfig } from '../config/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onChildAdded, off, set, get, serverTimestamp } from 'firebase/database';

// Initialize Firebase
let app;
let database;

try {
  // Check if Firebase is properly configured
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY_HERE') {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

/**
 * Generate a unique chat room ID based on user and scheme
 */
export const generateChatRoomId = (option, userId = null) => {
  const user = userId || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return `chats/${option}/${user}`;
};

/**
 * Send a message to Firebase Realtime Database
 * @param {string} chatRoomId - The chat room ID
 * @param {string} message - The message text
 * @param {boolean} isUser - Whether the message is from the user
 * @param {string} userId - User identifier
 * @returns {Promise<void>}
 */
export const sendRealtimeMessage = async (chatRoomId, message, isUser = true, userId = null) => {
  if (!database) {
    throw new Error('Firebase is not initialized. Please configure Firebase in src/config/firebaseConfig.js');
  }

  const messagesRef = ref(database, `${chatRoomId}/messages`);
  const newMessageRef = push(messagesRef);
  
  await set(newMessageRef, {
    text: message,
    isUser: isUser,
    userId: userId || 'user',
    timestamp: serverTimestamp(),
    createdAt: new Date().toISOString(),
  });

  return newMessageRef.key;
};

/**
 * Listen for new messages in a chat room
 * @param {string} chatRoomId - The chat room ID
 * @param {Function} callback - Callback function when a new message is received
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToMessages = (chatRoomId, callback) => {
  if (!database) {
    console.warn('Firebase is not initialized. Realtime updates will not work.');
    return () => {};
  }

  const messagesRef = ref(database, `${chatRoomId}/messages`);
  
  const handleNewMessage = (snapshot) => {
    if (snapshot.exists()) {
      const messageData = snapshot.val();
      callback({
        id: snapshot.key,
        text: messageData.text,
        isUser: messageData.isUser || false,
        userId: messageData.userId,
        timestamp: messageData.timestamp,
        createdAt: messageData.createdAt || new Date().toISOString(),
      });
    }
  };

  onChildAdded(messagesRef, handleNewMessage);

  // Return unsubscribe function
  return () => {
    off(messagesRef, 'child_added', handleNewMessage);
  };
};

/**
 * Get all messages from a chat room
 * @param {string} chatRoomId - The chat room ID
 * @returns {Promise<Array>} - Array of messages
 */
export const getChatHistory = async (chatRoomId) => {
  if (!database) {
    return [];
  }

  try {
    const messagesRef = ref(database, `${chatRoomId}/messages`);
    const snapshot = await get(messagesRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    const messages = [];
    snapshot.forEach((childSnapshot) => {
      const messageData = childSnapshot.val();
      messages.push({
        id: childSnapshot.key,
        text: messageData.text,
        isUser: messageData.isUser || false,
        userId: messageData.userId,
        timestamp: messageData.timestamp,
        createdAt: messageData.createdAt || new Date().toISOString(),
      });
    });

    // Sort by timestamp
    return messages.sort((a, b) => {
      const timeA = a.timestamp || a.createdAt;
      const timeB = b.timestamp || b.createdAt;
      return new Date(timeA) - new Date(timeB);
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

/**
 * Check if Firebase is properly configured
 * @returns {boolean}
 */
export const isFirebaseConfigured = () => {
  return !!database && firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY_HERE';
};

