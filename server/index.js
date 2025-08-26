import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import AuthRoute from './routes/Auth.route.js';
import VideoRoute from './routes/video.route.js';
import CommentRoute from './routes/comment.route.js';
import ChannelRoute from './routes/channel.route.js';
import UploadRoute from './routes/upload.route.js';

import './models/channel.model.js';
import './models/video.model.js';
import './models/comment.model.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Load env
dotenv.config();
console.log("DEBUG → Loaded MONGO URI:", process.env.MONGODB_URI);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', AuthRoute);
app.use('/api/videos', VideoRoute);
app.use('/api/comments', CommentRoute);
app.use('/api/channels', ChannelRoute);
app.use('/api/upload', UploadRoute);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Database connected successfully");
})
.catch((err) => {
  console.error("❌ Database connection failed", err);
});

// Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
