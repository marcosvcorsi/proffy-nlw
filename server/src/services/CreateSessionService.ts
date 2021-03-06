import { sign } from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';

import authConfig from '../config/auth';
import ServerError from '../errors/ServerError';

import { compareHash } from '../utils/hash';
import User from '../entities/User';

interface SessionResponse extends User {
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}

export default class CreateSessionService {
  async execute({ email, password }: IRequest): Promise<SessionResponse> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmail(email);

    if (!user || !(await compareHash(password, user.password))) {
      throw new ServerError('Usuário ou senha inválidos', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return {
      ...user,
      token,
    };
  }
}
