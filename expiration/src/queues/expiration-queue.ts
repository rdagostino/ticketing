import Queue from 'bull';
import { ExpirationCompletePublisner } from '../events/publishers/expiration-complete-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
  orderId: string;
}

const expirationQueue: Queue.Queue<Payload> = new Queue<Payload>(
  'order:expiration',
  {
    redis: {
      host: process.env.REDIS_HOST,
    },
  }
);

expirationQueue.process(async (job: Queue.Job<Payload>) => {
  const {
    data: { orderId },
  } = job;

  new ExpirationCompletePublisner(natsWrapper.client).publish({
    orderId,
  });
});

export { expirationQueue };
