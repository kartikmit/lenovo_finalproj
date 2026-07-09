import Roadmap from '../models/Roadmap.js';
import { getRoadmapFromAI } from '../services/aiService.js';

export const createPlan = async (req, res) => {
  const { topic } = req.body;
  const stepsData = await getRoadmapFromAI(topic, req.user.level);
  const plan = await Roadmap.create({ user: req.user._id, topic, steps: stepsData });
  res.status(201).json(plan);
};

export const getPlans = async (req, res) => {
  const plans = await Roadmap.find({ user: req.user._id });
  res.json(plans);
};

export const updateStep = async (req, res) => {
  const { planId, stepId } = req.body;
  const plan = await Roadmap.findById(planId);
  if (!plan) return res.status(404).json({ message: 'Not found' });
  const step = plan.steps.id(stepId);
  if (step) {
    step.isDone = true;
    const doneCount = plan.steps.filter(s => s.isDone).length;
    plan.progress = Math.round((doneCount / plan.steps.length) * 100);
    await plan.save();
    res.json(plan);
  } else {
    res.status(404).json({ message: 'Step not found' });
  }
};