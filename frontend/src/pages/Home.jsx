import { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import axios from 'axios';
import io from 'socket.io-client';
import Chatbot from '../components/Chatbot';
import TicketList from '../components/TicketList';
import Dashboard from '../components/Dashboard';

export default function Home() {
  const { user, token, logout } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io('/', { auth: { token } });
    setSocket(s);
    return () => s.disconnect();
  }, [token]);

  const fetchTickets = async () => {
    const res = await axios.get('/api/tickets', { headers: { Authorization: `Bearer ${token}` } });
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <button onClick={logout} className="bg-red-500 text-white p-2 rounded">Logout</button>
      </div>
      <Dashboard tickets={tickets} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <TicketList tickets={tickets} socket={socket} fetchTickets={fetchTickets} />
        <Chatbot token={token} socket={socket} />
      </div>
    </div>
  );
}
