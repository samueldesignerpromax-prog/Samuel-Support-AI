import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }],
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
  }],
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  closed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Conversation', conversationSchema);
