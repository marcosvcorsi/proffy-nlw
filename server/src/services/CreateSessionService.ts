import User from '../entities/User';
import CreateSessionDTO from '../dtos/CreateSessionDTO';
import UsersRepository from '../repositories/UsersRepository';
import db from '../database/connection';
import ServerError from '../errors/ServerError';

import { compareHash } from '../utils/hash';

export default class CreateSessionService {
  async execute({ email, password }: CreateSessionDTO): Promise<User> {
    const usersRepository = new UsersRepository(db);

    const user = await usersRepository.findByEmail(email);

    if (!user || !(await compareHash(password, user.password))) {
      throw new ServerError('Usuário ou senha inválidos', 401);
    }

    return user;
  }
}
