import mongoose from 'mongoose';

const knowledgeBaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  fileUrl: { type: String },
  fileType: { type: String, enum: ['pdf', 'docx', 'txt', 'md'] },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  tags: [String],
}, { timestamps: true });

export default mongoose.model('KnowledgeBase', knowledgeBaseSchema);
