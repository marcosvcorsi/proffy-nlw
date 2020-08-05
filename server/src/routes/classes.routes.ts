import { Router } from 'express';
import ClassesControler from '../controllers/ClassesController';

const classesRouter = Router();

const classesController = new ClassesControler();
classesRouter.post('/', classesController.create);

export default classesRouter;
