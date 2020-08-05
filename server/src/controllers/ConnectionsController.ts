import { Request, Response } from 'express';
import db from '../database/connection';
import ConnectionsRepository from '../repositories/ConnectionsRepository';

export default class ConnectionsController {
  public async create(request: Request, response: Response) {
    const { user_id } = request.body;

    const connectionsRepository = new ConnectionsRepository(db);

    await connectionsRepository.create({ user_id: Number(user_id) });

    return response.status(201).send();
  }

  public async list(request: Request, response: Response) {
    const connectionsRepository = new ConnectionsRepository(db);

    const [{ total }] = await connectionsRepository.countAll();

    return response.json({ total });
  }
}
