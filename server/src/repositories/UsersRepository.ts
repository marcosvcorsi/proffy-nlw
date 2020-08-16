import Knex from 'knex';
import User from '../entities/User';

export default class UsersRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async create({
    name,
    avatar,
    whatsapp,
    bio,
    password,
    email,
    lastname,
  }: User) {
    return this.db('users')
      .insert({
        name,
        avatar,
        whatsapp,
        bio,
        email,
        lastname,
        password,
      })
      .returning('id');
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.db<User>('users')
      .select('*')
      .where('email', '=', email)
      .first();

    return user;
  }
}
