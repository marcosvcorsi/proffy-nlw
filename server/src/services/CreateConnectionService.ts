import CreateConnectionDTO from '../dtos/CreateConnectionDTO';
import ConnectionsRepository from '../repositories/ConnectionsRepository';

export default class CreateConnectionService {
  public async execute({ user_id }: CreateConnectionDTO) {
    const connectionsRepository = new ConnectionsRepository();

    return connectionsRepository.create({ user_id });
  }
}
