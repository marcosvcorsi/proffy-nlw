import { Response, Request } from 'express';
import CreateClassService from '../services/CreateClassService';
import ListClassesService from '../services/ListClassesService';

export default class ClassesControler {
  public async list(request: Request, response: Response) {
    const { week_day, subject, time } = request.query;

    if (!week_day || !subject || !time) {
      return response.status(400).json({
        error: 'No filter params',
      });
    }

    const listClassesService = new ListClassesService();
    const classes = await listClassesService.execute({
      week_day: Number(week_day),
      subject: String(subject),
      time: String(time),
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
