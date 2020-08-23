import ClassesRepository from '../repositories/ClassesRepository';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ISchedule {
  week_day: number;
  from: string;
  to: string;
}

interface IRequest {
  subject: string;
  cost: number;
  user_id: number;
  schedules: ISchedule[];
}

export default class CreateClassService {
  public async execute({ subject, cost, schedules, user_id }: IRequest) {
    const classesRepository = new ClassesRepository();

    const class_schedules = schedules.map(scheduleItem => {
      return {
        ...scheduleItem,
        week_day: Number(scheduleItem.week_day),
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
      };
    });

    await classesRepository.create({
      subject,
      cost,
      user_id,
      class_schedules,
    });
  }
}
