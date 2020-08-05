import { Router } from 'express';

import classesRouter from './classes.routes';
import connectionsRouter from './connections.routes';

const routes = Router();

routes.use('/classes', classesRouter);
routes.use('/connections', connectionsRouter);

export default routes;
