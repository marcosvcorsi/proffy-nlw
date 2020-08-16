import { Response, Request } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, lastname, email, password } = request.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      lastname,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}
