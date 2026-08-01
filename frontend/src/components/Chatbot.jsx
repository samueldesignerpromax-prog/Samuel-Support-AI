import { useState } from 'react';
import axios from 'axios';

export default function Chatbot({ token }) {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Olá! Digite uma opção: financeiro, suporte, comercial, pedidos.' }]);
  const [input, setInput] = useState('');

  const send = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    try {
      const res = await axios.post('/api/chatbot/message', { message: input }, { headers: { Authorization: `Bearer ${token}` } });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Erro, tente novamente.' }]);
    }
    setInput('');
  };

  return (
    <div className="border p-4 rounded h-96 flex flex-col">
      <h2 className="font-bold mb-2">Chatbot</h2>
      <div className="flex-1 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`my-1 p-2 rounded ${m.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 border p-1" placeholder="Digite..." />
        <button onClick={send} className="bg-purple-600 text-white p-1">Enviar</button>
      </div>
    </div>
  );
}
