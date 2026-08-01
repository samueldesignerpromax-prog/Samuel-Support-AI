import { useState } from 'react';
import axios from 'axios';

export default function Chat({ token, user, onLogout }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Olá! Como posso ajudá-lo hoje?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    try {
      const res = await axios.post('/api/chat', { message: userMsg });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Erro ao se comunicar.' }]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', background: '#fff', borderRadius: 8, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Chat Support - {user?.name}</h3>
        <button onClick={onLogout}>Sair</button>
      </div>
      <div style={{ height: 400, overflowY: 'auto', border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === 'user' ? 'right' : 'left', margin: '5px 0' }}>
            <span style={{ background: m.sender === 'user' ? '#007bff' : '#e9ecef', color: m.sender === 'user' ? '#fff' : '#000', padding: '5px 10px', borderRadius: 10, display: 'inline-block' }}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Digite sua mensagem..." style={{ flex:1, padding:8 }} />
        <button onClick={sendMessage} style={{ padding:8, background:'#28a745', color:'#fff', border:'none' }}>Enviar</button>
      </div>
    </div>
  );
}
