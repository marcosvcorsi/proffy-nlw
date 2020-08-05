import CreateClassDTO from '../dtos/CreateClassDTO';
import db from '../database/connection';
import Knex from 'knex';
import FilterClassDTO from '../dtos/FilterClassDTO';

export default class ClassesRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async create({ cost, subject, user_id }: CreateClassDTO) {
    return this.db('classes').insert({
      subject,
      cost,
      user_id,
    });
  }

  public async findAllByFilters({ subject, time, week_day }: FilterClassDTO) {
    return db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [time])
          .whereRaw('`class_schedule`.`to` > ??', [time]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);
  }
}
