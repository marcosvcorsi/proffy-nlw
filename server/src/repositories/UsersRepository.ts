import CreateUserDTO from '../dtos/CreateUserDTO';
import Knex from 'knex';

export default class UsersRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async create({ name, avatar, whatsapp, bio }: CreateUserDTO) {
    return this.db('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    });
  }
}
