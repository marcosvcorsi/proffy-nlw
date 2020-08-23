import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';
import exceptionHandler from './middlewares/exceptionHandler';

import createConnection from './database';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());
app.use(exceptionHandler);

export default app;
