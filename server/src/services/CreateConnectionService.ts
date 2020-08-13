import CreateConnectionDTO from '../dtos/CreateConnectionDTO';
import ConnectionsRepository from '../repositories/ConnectionsRepository';
import db from '../database/connection';

export default class CreateConnectionService {
  public async execute({ user_id }: CreateConnectionDTO) {
    const connectionsRepository = new ConnectionsRepository(db);

    await connectionsRepository.create({ user_id: Number(user_id) });
  }
}
