import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@rdagostinotickets/common';

export class ExpirationCompletePublisner extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
