import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import { generateFallbackRoadmap } from './fallbackService.js';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getRoadmapFromAI = async (topic, level) => {
  try {
    const prompt = `Role: You are an expert academic mentor. Goal: Create a study plan for ${topic}. Context: The student is at a ${level} level. Return ONLY a valid JSON array of objects with 'title', 'description', and 'resources' array.`;
    const res = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
    });
    return JSON.parse(res.choices[0]?.message?.content);
  } catch (err) {
    return generateFallbackRoadmap(topic);
  }
};

export const getChatReply = async (message) => {
  try {
    const prompt = `I want you to act as a supportive teacher. I will ask you a question and you will reply simply. My question is: ${message}`;
    const res = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
    });
    return res.choices[0]?.message?.content;
  } catch (err) {
    return "I am currently offline.";
  }
};

export const getStepLesson = async (topic) => {
  try {
    const prompt = `Role: Teacher. Goal: Write a short, 3-paragraph lesson on ${topic}. Context: Keep it simple using markdown.`;
    const res = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
    });
    return res.choices[0]?.message?.content;
  } catch (err) {
    return "Lesson generation failed.";
  }
};

export const getStepQuiz = async (topic) => {
  try {
    const prompt = `Create a 3-question multiple choice quiz on ${topic}. Return ONLY a JSON array of objects with 'question', 'options' (array), and 'correctIndex' (number).`;
    const res = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
    });
    return JSON.parse(res.choices[0]?.message?.content);
  } catch (err) {
    return [];
  }
};