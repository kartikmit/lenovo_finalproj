import { getChatReply } from '../services/aiService.js';

export const askAI = async (req, res) => {
  const { message } = req.body;
  const reply = await getChatReply(message);
  res.json({ reply });
};