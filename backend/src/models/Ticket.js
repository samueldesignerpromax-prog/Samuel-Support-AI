import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  subject: String,
  description: String,
  status: { type: String, enum: ['open','in_progress','closed'], default: 'open' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
