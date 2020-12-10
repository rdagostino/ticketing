import {
  OrderCreatedEvent,
  Publisher,
  Subjects,
} from '@rdagostinotickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
