import ConnectionsRepository from '../repositories/ConnectionsRepository';

interface IRequest {
  user_id: number;
}

export default class CreateConnectionService {
  public async execute({ user_id }: IRequest) {
    const connectionsRepository = new ConnectionsRepository();

    return connectionsRepository.create({ user_id });
  }
}
