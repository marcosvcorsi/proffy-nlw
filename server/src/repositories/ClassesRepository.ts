import { Repository, getRepository } from 'typeorm';
import FilterClassDTO from '../dtos/FilterClassDTO';
import CreateClassDTO from '../dtos/CreateClassDTO';
import Class from '../entities/Class';

export default class ClassesRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  public async create({
    cost,
    subject,
    user_id,
    class_schedules,
  }: CreateClassDTO) {
    const newClass = this.ormRepository.create({
      subject,
      cost,
      user_id,
      class_schedules,
    });

    await this.ormRepository.save(newClass);

    return newClass.id;
  }

  public async findAllByFilters({ subject, time, week_day }: FilterClassDTO) {
    return this.ormRepository
      .createQueryBuilder('classes')
      .distinct()
      .leftJoinAndSelect('classes.class_schedules', 'class_schedules')
      .leftJoinAndSelect('classes.user', 'user')
      .where('classes.subject = :subject', { subject })
      .andWhere('class_schedules.week_day = :week_day', { week_day })
      .andWhere('class_schedules.from <= :time', { time })
      .andWhere('class_schedules.to > :time', { time })
      .getMany();
  }
}
