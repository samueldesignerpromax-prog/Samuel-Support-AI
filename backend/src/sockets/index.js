import chatHandler from './handlers/chatHandler.js';
import ticketHandler from './handlers/ticketHandler.js';

export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);
    
    // Autenticação via token
    const token = socket.handshake.auth.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        // Adicionar à sala de usuário
        socket.join(`user:${decoded.id}`);
      } catch (e) {
        console.log('Token inválido');
      }
    }

    // Handlers
    chatHandler(socket, io);
    ticketHandler(socket, io);

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};
