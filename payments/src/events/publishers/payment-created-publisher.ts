import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from '@rdagostinotickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
