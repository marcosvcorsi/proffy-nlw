import { Repository, getRepository } from 'typeorm';
import CreateUserDTO from 'dtos/CreateUserDTO';
import User from '../entities/User';

export default class UsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    avatar,
    whatsapp,
    bio,
    password,
    email,
    lastname,
  }: CreateUserDTO) {
    const user = this.ormRepository.create({
      name,
      avatar,
      whatsapp,
      bio,
      email,
      lastname,
      password,
    });

    await this.ormRepository.save(user);

    return user.id;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
