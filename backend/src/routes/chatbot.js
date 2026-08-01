import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Respostas estáticas (sem IA)
const replies = {
  'financeiro': 'Para questões financeiras, acesse nosso setor financeiro.',
  'suporte': 'Estamos aqui para ajudar! Descreva seu problema.',
  'comercial': 'Fale com nosso comercial pelo email comercial@empresa.com',
  'pedidos': 'Acompanhe seu pedido no site ou entre em contato.',
  'default': 'Olá! Como posso ajudá-lo? Digite uma opção: financeiro, suporte, comercial, pedidos.'
};

router.post('/message', protect, (req, res) => {
  const { message } = req.body;
  const lower = message.toLowerCase();
  let reply = replies.default;
  for (const [key, value] of Object.entries(replies)) {
    if (lower.includes(key)) {
      reply = value;
      break;
    }
  }
  res.json({ reply });
});

export default router;
