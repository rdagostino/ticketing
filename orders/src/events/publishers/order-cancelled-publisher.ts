import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from '@rdagostinotickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
