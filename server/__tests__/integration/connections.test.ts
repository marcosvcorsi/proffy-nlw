import request from 'supertest';
import app from '../../src/app';

import db from '../../src/database/connection';
import UsersRepository from '../../src/repositories/UsersRepository';
import ConnectionsRepository from '../../src/repositories/ConnectionsRepository';

describe('Connection Test Suite', () => {
  beforeEach(async () => {
    await db('connections').del();
    await db('users').del();
  });

  it('should be able to make a connection', async () => {
    const usersRepository = new UsersRepository(db);
    const [user_id] = await usersRepository.create({
      name: 'any',
      avatar: 'any',
      whatsapp: 'any',
      bio: 'any',
    });

    const response = await request(app).post('/connections').send({
      user_id,
    });

    expect(response.status).toBe(201);
  });

  it('should throw an erro when user id is not provided', async () => {
    const response = await request(app).post('/connections').send({});

    expect(response.status).toBe(400);
  });

  it('should be able to list connections', async () => {
    const usersRepository = new UsersRepository(db);

    const [first] = await usersRepository.create({
      name: 'any',
      avatar: 'any',
      whatsapp: 'any',
      bio: 'any',
    });

    const [second] = await usersRepository.create({
      name: 'other',
      avatar: 'other',
      whatsapp: 'other',
      bio: 'other',
    });

    const [third] = await usersRepository.create({
      name: 'other',
      avatar: 'other',
      whatsapp: 'other',
      bio: 'other',
    });

    const connectionsRepository = new ConnectionsRepository(db);

    await connectionsRepository.create({ user_id: first });

    await connectionsRepository.create({ user_id: second });

    await connectionsRepository.create({ user_id: third });

    const response = await request(app).get('/connections');

    expect(response.status).toBe(200);
    expect(response.body.total).toBe('3');
  });
});
