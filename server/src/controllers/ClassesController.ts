import { Response, Request } from 'express';
import ClassesRepository from '../repositories/ClassesRepository';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import db from '../database/connection';
import CreateClassService from '../services/CreateClassService';

export default class ClassesControler {
  public async list(request: Request, response: Response) {
    const { week_day, subject, time } = request.query;

    if (!week_day || !subject || !time) {
      return response.status(400).json({
        error: 'No filter params',
      });
    }

    const timeInMinutes = convertHourToMinutes(time as string);

    const classesRepository = new ClassesRepository(db);
    const classes = await classesRepository.findAllByFilters({
      week_day: Number(week_day),
      subject: String(subject),
      time: timeInMinutes,
    });

    return response.json(classes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const createClassService = new CreateClassService();

    await createClassService.execute({
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    });

    return response.status(201).send();
  }
}
