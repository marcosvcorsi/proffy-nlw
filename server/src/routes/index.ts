import { Router } from 'express';

import classesRouter from './classes.routes';
import connectionsRouter from './connections.routes';
import sessionsRouter from './session.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/session', sessionsRouter);
routes.use('/users', usersRouter);

routes.use('/classes', classesRouter);
routes.use('/connections', connectionsRouter);

export default routes;
