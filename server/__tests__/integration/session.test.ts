import request from 'supertest';
import app from '../../src/app';

import db from '../../src/database/connection';
import UsersRepository from '../../src/repositories/UsersRepository';

describe('Session Test Suite', () => {
  beforeEach(async () => {
    await db('users').del();

    const usersRepository = new UsersRepository(db);

    await usersRepository.create({
      name: 'validname',
      lastname: 'validlastanme',
      avatar: 'validavatar',
      whatsapp: 'validwp',
      bio: 'validbio',
      email: 'validemail@mail.com',
      password: 'validpassword',
    });
  });

  it('should be able to create a new session', async () => {
    const response = await request(app).post('/session').send({
      email: 'validemail@mail.com',
      password: 'validpassword',
    });

    expect(response.status).toBe(200);
  });

  it('should not be able to create a new session with invalid password', async () => {
    const response = await request(app).post('/session').send({
      email: 'validemail@mail.com',
      password: 'invalidpassword',
    });

    expect(response.status).toBe(401);
  });

  it('should not be able to create a new session with invalid email', async () => {
    const response = await request(app).post('/session').send({
      email: 'invalidemail@mail.com',
      password: 'validpassword',
    });

    expect(response.status).toBe(401);
  });

  it('should throw an error when password param not found', async () => {
    const response = await request(app).post('/session').send({
      email: 'validemail@mail.com',
    });

    expect(response.status).toBe(400);
  });

  it('should throw an error when email param not found', async () => {
    const response = await request(app).post('/session').send({
      password: 'validpassword',
    });

    expect(response.status).toBe(400);
  });

  it('should throw an error when email param is invalid', async () => {
    const response = await request(app).post('/session').send({
      email: 'invalidemail',
    });

    expect(response.status).toBe(400);
  });
});
