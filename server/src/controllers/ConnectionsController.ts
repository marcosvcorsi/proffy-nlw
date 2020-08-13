import { Request, Response } from 'express';
import CreateConnectionService from '../services/CreateConnectionService';
import ListConnectionsService from '../services/ListConnectionsService';

export default class ConnectionsController {
  public async create(request: Request, response: Response) {
    const { user_id } = request.body;

    const createConnectionService = new CreateConnectionService();

    await createConnectionService.execute({ user_id: Number(user_id) });

    return response.status(201).send();
  }

  public async list(request: Request, response: Response) {
    const listConnectionsService = new ListConnectionsService();
    const total = await listConnectionsService.execute();

    return response.json({ total });
  }
}
