import { getStepLesson, getStepQuiz } from '../services/aiService.js';

export const fetchLesson = async (req, res) => {
  const { topic } = req.body;
  const content = await getStepLesson(topic);
  res.json({ content });
};

export const fetchQuiz = async (req, res) => {
  const { topic } = req.body;
  const quiz = await getStepQuiz(topic);
  res.json(quiz);
};