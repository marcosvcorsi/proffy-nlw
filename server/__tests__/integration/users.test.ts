import request from 'supertest';
import app from '../../src/app';

import db from '../../src/database/connection';
import CreateUserService from '../../src/services/CreateUserService';

describe('User Test Suite', () => {
  beforeEach(async () => {
    await db('users').del();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'validname',
      lastname: 'validlastname',
      email: 'validemail@mail.com',
      password: 'validpassword',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new user using an email that already exists', async () => {
    const createUserService = new CreateUserService();
    await createUserService.execute({
      name: 'validname',
      lastname: 'validlastname',
      email: 'validemail@mail.com',
      password: 'validpassword',
    });

    const response = await request(app).post('/users').send({
      name: 'validname',
      lastname: 'validlastname',
      email: 'validemail@mail.com',
      password: 'validpassword',
    });

    expect(response.status).toBe(400);
  });

  it('should throw an error when name is not provided', async () => {
    const response = await request(app).post('/users').send({
      lastname: 'validlastname',
      email: 'validemail@mail.com',
      password: 'validpassword',
    });

    expect(response.status).toBe(400);
  });

  it('should throw an error when last name is not provided', async () => {
    const response = await request(app).post('/users').send({
      name: 'validname',
      email: 'validemail@mail.com',
      password: 'validpassword',
    });

    expect(response.status).toBe(400);
  });

  it('should throw an error when email is not provided', async () => {
    const response = await request(app).post('/users').send({
      name: 'validname',
      lastname: 'validlastname',
      password: 'validpassword',
    });

    expect(response.status).toBe(400);
  });

  it('should throw an error when password is not provided', async () => {
    const response = await request(app).post('/users').send({
      name: 'validname',
      lastname: 'validlastname',
      email: 'validemail@mail.com',
    });

    expect(response.status).toBe(400);
  });

  it('should throw an error when email is invalid', async () => {
    const response = await request(app).post('/users').send({
      name: 'validname',
      lastname: 'validlastname',
      email: 'invalidemail',
      password: 'validpassword',
    });

    expect(response.status).toBe(400);
  });
});
