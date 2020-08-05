import Knex from 'knex';
import CreateConnectionDTO from '../dtos/CreateConnectionDTO';

export default class ConnectionsRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async create({ user_id }: CreateConnectionDTO) {
    console.log(user_id);

    return this.db('connections').insert({
      user_id,
    });
  }

  public async countAll() {
    return this.db('connections').count('* as total');
  }
}
