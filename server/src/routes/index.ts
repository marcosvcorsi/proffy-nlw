import { Router } from 'express';

import classesRouter from './classes.routes';

const routes = Router();

routes.use('/classes', classesRouter);

export default routes;
