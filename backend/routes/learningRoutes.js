import express from 'express';
import { fetchLesson, fetchQuiz } from '../controllers/learningController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/lesson', protect, fetchLesson);
router.post('/quiz', protect, fetchQuiz);
export default router;