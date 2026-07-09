import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  resources: [{ type: String }],
  isDone: { type: Boolean, default: false }
});

const roadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  steps: [stepSchema],
  progress: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Roadmap', roadmapSchema);