import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Rota de login (usuário fixo)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@admin.com' && password === '123456') {
    return res.json({ token: 'fake-jwt-token', user: { name: 'Admin' } });
  }
  res.status(401).json({ error: 'Credenciais inválidas' });
});

// Rota do chatbot (respostas fixas)
app.post('/chat', (req, res) => {
  const { message } = req.body;
  const lower = message.toLowerCase();
  let reply = 'Desculpe, não entendi. Tente: "oi", "ajuda", "produtos".';
  if (lower.includes('oi') || lower.includes('olá')) {
    reply = 'Olá! Como posso ajudá-lo?';
  } else if (lower.includes('ajuda')) {
    reply = 'Posso ajudar com informações sobre produtos, suporte técnico e financeiro.';
  } else if (lower.includes('produto')) {
    reply = 'Temos vários produtos. Acesse nosso site para mais detalhes.';
  } else if (lower.includes('tchau')) {
    reply = 'Até logo!';
  }
  res.json({ reply });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
