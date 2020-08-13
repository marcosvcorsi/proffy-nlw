import Knex from 'knex';
import { Connection } from '../entities/Connection';

export default class ConnectionsRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async create({ user_id }: Connection) {
    return this.db('connections').insert({
      user_id,
    });
  }

  public async countAll() {
    return this.db('connections').count('* as total');
  }
}
