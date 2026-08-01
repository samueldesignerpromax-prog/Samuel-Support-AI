import { useState } from 'react';
import axios from 'axios';

export default function TicketList({ tickets, socket, fetchTickets }) {
  const [newTicket, setNewTicket] = useState({ subject: '', description: '' });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [message, setMessage] = useState('');

  const createTicket = async () => {
    await axios.post('/api/tickets', newTicket);
    setNewTicket({ subject: '', description: '' });
    fetchTickets();
  };

  const sendMessage = async (ticketId) => {
    await axios.post(`/api/tickets/${ticketId}/messages`, { content: message });
    setMessage('');
    fetchTickets();
    socket?.emit('sendMessage', { ticketId, content: message, token: localStorage.getItem('auth') });
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">Tickets</h2>
      <div className="mb-2">
        <input placeholder="Subject" value={newTicket.subject} onChange={e => setNewTicket({...newTicket, subject: e.target.value})} className="border p-1 mr-1" />
        <input placeholder="Description" value={newTicket.description} onChange={e => setNewTicket({...newTicket, description: e.target.value})} className="border p-1 mr-1" />
        <button onClick={createTicket} className="bg-blue-500 text-white p-1">Create</button>
      </div>
      <ul>
        {tickets.map(t => (
          <li key={t._id} className="border-b p-2 cursor-pointer" onClick={() => setSelectedTicket(t)}>
            {t.subject} - {t.status}
          </li>
        ))}
      </ul>
      {selectedTicket && (
        <div className="mt-2 border-t pt-2">
          <h3>{selectedTicket.subject}</h3>
          <div className="max-h-40 overflow-auto">
            {selectedTicket.messages?.map(m => (
              <div key={m._id} className="bg-gray-100 m-1 p-1 rounded"><strong>{m.sender?.name || 'User'}:</strong> {m.content}</div>
            ))}
          </div>
          <input value={message} onChange={e => setMessage(e.target.value)} className="border p-1 mr-1" placeholder="Message" />
          <button onClick={() => sendMessage(selectedTicket._id)} className="bg-green-500 text-white p-1">Send</button>
        </div>
      )}
    </div>
  );
}
