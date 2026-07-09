import { useState } from 'react';
import api from '../utils/axios.js';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const newLog = [...messages, { role: 'user', content: text }];
    setMessages(newLog);
    setIsTyping(true);
    try {
      const res = await api.post('/chat/ask', { message: text });
      setMessages([...newLog, { role: 'ai', content: res.data.reply }]);
    } catch (error) {
      setMessages([...newLog, { role: 'ai', content: "Error connecting to AI." }]);
    } finally {
      setIsTyping(false);
    }
  };
  return { messages, isTyping, sendMessage };
};