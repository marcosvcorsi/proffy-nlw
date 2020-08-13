import Knex from 'knex';
import User from '../entities/User';

export default class UsersRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async create({ name, avatar, whatsapp, bio }: User) {
    return this.db('users')
      .insert({
        name,
        avatar,
        whatsapp,
        bio,
      })
      .returning('id');
  }
}
