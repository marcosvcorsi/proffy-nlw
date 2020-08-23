/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Repository, getRepository } from 'typeorm';
import ClassSchedule from '../entities/ClassSchedule';

export default class ClassScheduleRepository {
  private ormRepository: Repository<ClassSchedule>;

  constructor() {
    this.ormRepository = getRepository(ClassSchedule);
  }

  public async create(schedules: ClassSchedule[]) {
    for (const schedule of schedules) {
      const { week_day, from, to, class_id } = schedule;

      const newSchedule = this.ormRepository.create({
        week_day,
        from,
        to,
        class_id,
      });

      await this.ormRepository.save(newSchedule);
    }
  }
}
