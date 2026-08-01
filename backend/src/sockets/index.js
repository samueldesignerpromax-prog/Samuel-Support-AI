import Message from '../models/Message.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';

export default (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinTicket', async (ticketId) => {
      socket.join(`ticket-${ticketId}`);
    });

    socket.on('sendMessage', async ({ ticketId, content, token }) => {
      try {
        // Decodificar token (simplificado)
        const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;
        if (!userId) return;
        const message = await Message.create({
          ticket: ticketId,
          sender: userId,
          content,
        });
        await Ticket.findByIdAndUpdate(ticketId, { $push: { messages: message._id } });
        io.to(`ticket-${ticketId}`).emit('newMessage', message);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  });
};
