import { Response, Request } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import ClassesRepository from '../repositories/ClassesRepository';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import ClassScheduleRepository from '../repositories/ClassScheduleRepository';
import db from '../database/connection';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesControler {
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

    const trx = await db.transaction();

    try {
      const usersRepository = new UsersRepository(trx);
      const [user_id] = await usersRepository.create({
        name,
        avatar,
        bio,
        whatsapp,
      });

      const classesRepository = new ClassesRepository(trx);
      const [class_id] = await classesRepository.create({
        subject,
        cost,
        user_id,
      });

      const classSchedules = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          ...scheduleItem,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id,
        };
      });

      const classScheduleRepository = new ClassScheduleRepository(trx);
      await classScheduleRepository.create({ schedules: classSchedules });

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error whilte creating new class',
      });
    }
  }
}
