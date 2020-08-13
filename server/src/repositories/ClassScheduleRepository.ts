import Knex from 'knex';
import ClassSchedule from '../entities/ClassSchedule';

export default class ClassScheduleRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async create(schedules: ClassSchedule[]) {
    return this.db('class_schedule').insert(schedules);
  }
}
