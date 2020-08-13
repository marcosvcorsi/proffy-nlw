import ConnectionsRepository from '../repositories/ConnectionsRepository';
import db from '../database/connection';

export default class ListConnectionsService {
  public async execute() {
    const connectionsRepository = new ConnectionsRepository(db);

    const [{ total }] = await connectionsRepository.countAll();

    return total;
  }
}
