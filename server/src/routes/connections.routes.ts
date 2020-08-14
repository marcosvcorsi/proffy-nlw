import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import ConnectionsController from '../controllers/ConnectionsController';

const connectionsRouter = Router();

const connectionsController = new ConnectionsController();

connectionsRouter.get('/', connectionsController.list);
connectionsRouter.post(
  '/',
  celebrate({
    body: {
      user_id: Joi.number().integer().required(),
    },
  }),
  connectionsController.create,
);

export default connectionsRouter;
