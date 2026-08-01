import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
