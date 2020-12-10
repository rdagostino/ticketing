import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
  // Create an instance of a ticket.
  const ticket = Ticket.build({
    title: 'concert',
    price: 4,
    userId: '123',
  });

  // Save the ticket to the database.
  await ticket.save();

  // Fetch the ticket twice.
  const firstInsance = await Ticket.findById(ticket.id);
  const secondInsance = await Ticket.findById(ticket.id);

  // Make two separate changes to the tickets we fetched
  firstInsance!.set({ price: 10 });
  secondInsance!.set({ price: 15 });

  // Save the first fetched ticket.
  await firstInsance!.save();

  // Save the second fetched ticket and expect an error.
  try {
    await secondInsance!.save();
  } catch (e) {
    return done();
  }

  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 4,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);
});
