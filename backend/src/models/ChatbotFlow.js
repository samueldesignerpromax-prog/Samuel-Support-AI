import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['message', 'question', 'button', 'condition', 'response', 'ai', 'transfer', 'ticket', 'end'],
    required: true
  },
  position: { x: Number, y: Number },
  data: {
    label: String,
    content: String,
    buttons: [{ label: String, target: String }],
    condition: String,
    target: String,
    options: mongoose.Schema.Types.Mixed,
  },
});

const chatbotFlowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  nodes: [nodeSchema],
  edges: [{
    source: String,
    target: String,
    label: String,
  }],
  active: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('ChatbotFlow', chatbotFlowSchema);
