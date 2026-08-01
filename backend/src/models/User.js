import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin','agent','client'], default: 'client' },
  online: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
