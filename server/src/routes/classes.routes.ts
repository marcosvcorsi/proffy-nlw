import { Router } from 'express';

import { celebrate, Joi } from 'celebrate';

import ClassesControler from '../controllers/ClassesController';

const classesRouter = Router();

const classesController = new ClassesControler();

classesRouter.get(
  '/',
  celebrate({
    query: {
      week_day: Joi.string().required(),
      subject: Joi.string().required(),
      time: Joi.string().required(),
    },
  }),
  classesController.list,
);

classesRouter.post(
  '/',
  celebrate({
    body: {
      name: Joi.string().required(),
      avatar: Joi.string().required(),
      whatsapp: Joi.string().required(),
      bio: Joi.string().required(),
      subject: Joi.string().required(),
      cost: Joi.number().required(),
      schedule: Joi.array().min(1).required(),
    },
  }),
  classesController.create,
);

export default classesRouter;
