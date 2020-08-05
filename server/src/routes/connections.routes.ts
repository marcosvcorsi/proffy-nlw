import { Router } from 'express';
import ConnectionsController from '../controllers/ConnectionsController';

const connectionsRouter = Router();

const connectionsController = new ConnectionsController();

connectionsRouter.get('/', connectionsController.list);
connectionsRouter.post('/', connectionsController.create);

export default connectionsRouter;
