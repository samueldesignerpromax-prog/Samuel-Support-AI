import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'supervisor', 'agent', 'client'],
    default: 'client'
  },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  active: { type: Boolean, default: true },
  online: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now },
  avatar: { type: String },
  refreshToken: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
