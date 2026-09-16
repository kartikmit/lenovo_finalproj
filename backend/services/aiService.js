import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import { generateFallbackRoadmap } from './fallbackService.js';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = 'groq/compound-mini';

const parseSafeJson = (text, fallback) => {
  try {
    const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    return fallback;
  }
};

export const getRoadmapFromAI = async (topic, level) => {
  try {
    const prompt = `Role: Academic mentor. Goal: Create a study plan for ${topic}. Context: The student is at a ${level} level. Return ONLY a valid JSON array of objects with 'title', 'description', and 'resources' (array). No extra text.`;
    const res = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
    });
    const raw = res.choices[0]?.message?.content || '';
    return parseSafeJson(raw, generateFallbackRoadmap(topic));
  } catch (err) {
    console.error('--- GROQ ROADMAP ERROR ---', err?.message || err);
    return generateFallbackRoadmap(topic);
  }
};

export const getChatReply = async (message) => {
  try {
    const prompt = `You are a supportive academic mentor. Answer this question simply and concisely: ${message}`;
    const res = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
    });
    return res.choices[0]?.message?.content || "I couldn't generate a response.";
  } catch (err) {
    console.error('--- GROQ CHAT ERROR ---', err?.message || err);
    return "I am currently offline.";
  }
};

export const getStepLesson = async (topic) => {
  try {
    const prompt = `Role: Teacher. Goal: Write a short, 3-paragraph lesson on ${topic}. Context: Keep it simple using markdown.`;
    const res = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
    });
    return res.choices[0]?.message?.content || "Lesson generation failed.";
  } catch (err) {
    console.error('--- GROQ LESSON ERROR ---', err?.message || err);
    return "Lesson generation failed.";
  }
};

export const getStepQuiz = async (topic) => {
  try {
    const prompt = `Create a 3-question multiple choice quiz on ${topic}. Return ONLY a JSON array of objects with 'question', 'options' (array of 4 options), and 'correctIndex' (number 0-3).`;
    const res = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: MODEL,
    });
    const raw = res.choices[0]?.message?.content || '';
    return parseSafeJson(raw, []);
  } catch (err) {
    console.error('--- GROQ QUIZ ERROR ---', err?.message || err);
    return [];
  }
};