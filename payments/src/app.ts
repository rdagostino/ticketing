// Imports.
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from '@rdagostinotickets/common';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { createChargeRouter } from './routes/new';

// Setup application.
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);
app.use(createChargeRouter);

app.all(
  '*',
  async (req, res, next): Promise<void> => {
    throw new NotFoundError();
  }
);

// Middlewares.
app.use(errorHandler);

export { app };
