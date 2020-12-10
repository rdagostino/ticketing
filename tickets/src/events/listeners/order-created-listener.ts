import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from '@rdagostinotickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: OrderCreatedEvent['data'],
    msg: Message
  ): Promise<void> {
    const {
      id,
      ticket: { id: ticketId },
    } = data;

    // Find the ticket that the order is reserving.
    const ticket = await Ticket.findById(ticketId);

    // If no ticket, throw error.
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Mark the ticket as being reserved by settings its orderId property.
    ticket.set({ orderId: id });

    // Save the ticket.
    await ticket.save();

    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    // ack the mesge.
    msg.ack();
  }
}
