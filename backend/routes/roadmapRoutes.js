import express from 'express';
import { createPlan, getPlans, updateStep } from '../controllers/roadmapController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/create', protect, createPlan);
router.get('/', protect, getPlans);
router.put('/update', protect, updateStep);
export default router;