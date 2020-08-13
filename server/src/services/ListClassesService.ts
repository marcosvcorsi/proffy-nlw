import ListClassDTO from '../dtos/ListClassDTO';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import ClassesRepository from '../repositories/ClassesRepository';
import db from '../database/connection';

export default class ListClassesService {
  public async execute({ subject, week_day, time }: ListClassDTO) {
    const timeInMinutes = convertHourToMinutes(time as string);

    const classesRepository = new ClassesRepository(db);
    const classes = await classesRepository.findAllByFilters({
      week_day: Number(week_day),
      subject: String(subject),
      time: timeInMinutes,
    });

    return classes;
  }
}
