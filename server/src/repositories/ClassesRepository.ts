import CreateClassDTO from '../dtos/CreateClassDTO';
import db from '../database/connection';
import Knex from 'knex';

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
}
