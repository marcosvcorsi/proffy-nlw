import { Response, Request } from 'express';
import CreateClassService from '../services/CreateClassService';
import ListClassesService from '../services/ListClassesService';

export default class ClassesControler {
  public async list(request: Request, response: Response) {
    const { week_day, subject, time } = request.query;

    const listClassesService = new ListClassesService();
    const classes = await listClassesService.execute({
      week_day: String(week_day),
      subject: String(subject),
      time: String(time),
    });

    return response.json(classes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { subject, cost, schedules } = request.body;

    const createClassService = new CreateClassService();

    await createClassService.execute({
      subject,
      cost,
      schedules,
      user_id: Number(user_id),
    });

    return response.status(201).send();
  }
}
