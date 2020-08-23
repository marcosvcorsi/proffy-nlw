import ConnectionsRepository from '../repositories/ConnectionsRepository';

export default class ListConnectionsService {
  async execute(): Promise<number> {
    const connectionsRepository = new ConnectionsRepository();

    const total = await connectionsRepository.countAll();

    return total;
  }
}
