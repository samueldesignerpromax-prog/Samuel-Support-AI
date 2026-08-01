import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('FAQ', faqSchema);
