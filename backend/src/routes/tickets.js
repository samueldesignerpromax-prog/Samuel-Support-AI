import express from 'express';
import Ticket from '../models/Ticket.js';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  const tickets = await Ticket.find({ client: req.user._id }).populate('assignedTo messages');
  res.json(tickets);
});

router.post('/', async (req, res) => {
  const { subject, description } = req.body;
  const ticket = await Ticket.create({ subject, description, client: req.user._id });
  res.status(201).json(ticket);
});

router.post('/:id/messages', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  const message = await Message.create({
    ticket: ticket._id,
    sender: req.user._id,
    content: req.body.content,
  });
  ticket.messages.push(message._id);
  await ticket.save();
  res.json(message);
});

export default router;
