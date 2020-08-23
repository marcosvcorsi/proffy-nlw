import CreateUserDTO from '../dtos/CreateUserDTO';
import UsersRepository from '../repositories/UsersRepository';
import ServerError from '../errors/ServerError';
import { generateHash } from '../utils/hash';

export default class CreateUserService {
  async execute({ name, email, lastname, password }: CreateUserDTO) {
    const usersRepository = new UsersRepository();

    const findEmail = await usersRepository.findByEmail(email);

    if (findEmail) {
      throw new ServerError('Email already exists from another user');
    }

    const hashedPassword = await generateHash(password);

    const user = await usersRepository.create({
      name,
      email,
      lastname,
      password: hashedPassword,
    });

    return user;
  }
}
