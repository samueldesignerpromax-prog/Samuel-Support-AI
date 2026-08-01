import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Servir arquivos estáticos do frontend (após build)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Rotas da API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@admin.com' && password === '123456') {
    return res.json({ token: 'fake-token', user: { name: 'Admin' } });
  }
  res.status(401).json({ error: 'Credenciais inválidas' });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  const lower = message.toLowerCase();
  let reply = 'Não entendi. Tente: "oi", "ajuda", "produtos".';
  if (lower.includes('oi') || lower.includes('olá')) reply = 'Olá! Como posso ajudá-lo?';
  else if (lower.includes('ajuda')) reply = 'Posso ajudar com produtos, suporte técnico e financeiro.';
  else if (lower.includes('produto')) reply = 'Temos vários produtos. Acesse nosso site.';
  else if (lower.includes('tchau')) reply = 'Até logo!';
  res.json({ reply });
});

// Fallback para rotas do frontend (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
