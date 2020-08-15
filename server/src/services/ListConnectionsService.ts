import ConnectionsRepository from '../repositories/ConnectionsRepository';
import db from '../database/connection';

export default class ListConnectionsService {
  async execute(): Promise<number> {
    const connectionsRepository = new ConnectionsRepository(db);

    const [{ total }] = await connectionsRepository.countAll();

    return total as number;
  }
}
