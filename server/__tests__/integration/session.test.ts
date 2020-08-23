import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import app from '../../src/app';

import createConnection from '../../src/database';

import CreateUserService from '../../src/services/CreateUserService';

let connection: Connection;

describe('Session Test Suite', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS connections');
    await connection.query('DROP TABLE IF EXISTS class_schedule');
    await connection.query('DROP TABLE IF EXISTS classes');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM users');

    const createUserService = new CreateUserService();

    const email = 'validemail@mail.com';
    const password = 'validpassword';

    await createUserService.execute({
      name: 'validname',
      lastname: 'validlastanme',
      email,
      password,
    });
  });

  afterAll(async () => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a new session', async () => {
    const response = await request(app).post('/session').send({
      email: 'validemail@mail.com',
      password: 'validpassword',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
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
