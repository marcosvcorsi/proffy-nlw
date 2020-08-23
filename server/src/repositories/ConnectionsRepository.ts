import { Repository, getRepository } from 'typeorm';
import CreateConnectionDTO from '../dtos/CreateConnectionDTO';
import Connection from '../entities/Connection';

export default class ConnectionsRepository {
  private ormRepository: Repository<Connection>;

  constructor() {
    this.ormRepository = getRepository(Connection);
  }

  public async create({ user_id }: CreateConnectionDTO) {
    const connection = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(connection);

    return connection.id;
  }

  public async countAll() {
    return this.ormRepository.count();
  }
}
