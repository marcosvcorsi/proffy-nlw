import convertHourToMinutes from '../utils/convertHourToMinutes';
import ClassesRepository from '../repositories/ClassesRepository';

interface IRequest {
  subject: string;
  week_day: string;
  time: string;
}

export default class ListClassesService {
  public async execute({ subject, week_day, time }: IRequest) {
    const timeInMinutes = convertHourToMinutes(time as string);

    const classesRepository = new ClassesRepository();
    const classes = await classesRepository.findAllByFilters({
      week_day: Number(week_day),
      subject: String(subject),
      time: timeInMinutes,
    });

    return classes;
  }
}
