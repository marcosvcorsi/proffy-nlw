import { Repository, getRepository } from 'typeorm';
import FilterClassDTO from '../dtos/FilterClassDTO';
import CreateClassDTO from '../dtos/CreateClassDTO';
import Class from '../entities/Class';

export default class ClassesRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  public async create({ cost, subject, user_id }: CreateClassDTO) {
    const newClass = this.ormRepository.create({
      subject,
      cost,
      user_id,
    });

    await this.ormRepository.save(newClass);

    return newClass.id;
  }

  public async findAllByFilters({ subject, time, week_day }: FilterClassDTO) {
    console.log(subject, time, week_day);

    // return this.db('classes')
    //   .whereExists(function () {
    //     this.select('class_schedule.*')
    //       .from('class_schedule')
    //       .whereRaw('class_schedule.class_id = classes.id')
    //       .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
    //       .whereRaw('class_schedule.from <= ??', [time])
    //       .whereRaw('class_schedule.to > ??', [time]);
    //   })
    //   .where('classes.subject', '=', subject)
    //   .join('users', 'classes.user_id', '=', 'users.id')
    //   .select(['classes.*', 'users.*']);
    return [];
  }
}
