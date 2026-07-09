import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { apiLimiter } from './middleware/rateLimiter.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import learningRoutes from './routes/learningRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'https://lenovo-finalproj.vercel.app', 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/learn', learningRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
