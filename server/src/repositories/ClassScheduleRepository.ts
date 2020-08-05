import CreateClassScheduleDTO from '../dtos/CreateClassScheduleDTO';
import Knex from 'knex';

export default class ClassScheduleRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async create({ schedules }: CreateClassScheduleDTO) {
    return this.db('class_schedule').insert(schedules);
  }
}
