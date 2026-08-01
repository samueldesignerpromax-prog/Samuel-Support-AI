import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  status: { 
    type: String, 
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open'
  },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slaDeadline: { type: Date },
  resolvedAt: { type: Date },
  closedAt: { type: Date },
  rating: { type: Number, min: 1, max: 5 },
  ratingComment: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
}, { timestamps: true });

ticketSchema.pre('save', function(next) {
  if (!this.number) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.number = `TICK-${year}${month}${day}-${random}`;
  }
  next();
});

export default mongoose.model('Ticket', ticketSchema);
