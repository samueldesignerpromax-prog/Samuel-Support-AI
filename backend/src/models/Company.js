import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  primaryColor: { type: String, default: '#4F46E5' },
  secondaryColor: { type: String, default: '#7C3AED' },
  active: { type: Boolean, default: true },
  settings: {
    sla: {
      financeiro: { type: Number, default: 4 },
      suporte: { type: Number, default: 2 },
      comercial: { type: Number, default: 8 },
    },
    chatbot: {
      welcomeMessage: { type: String, default: 'Olá 👋 Bem-vindo à Samuel Support AI. Como podemos ajudar?' },
    },
  },
}, { timestamps: true });

export default mongoose.model('Company', companySchema);
