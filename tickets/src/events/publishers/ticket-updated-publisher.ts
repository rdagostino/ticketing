import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@rdagostinotickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
