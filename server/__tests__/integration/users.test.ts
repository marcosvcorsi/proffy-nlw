import request from 'supertest';
import { Connection, getConnection } from 'typeorm';

import app from '../../src/app';

import createConnection from '../../src/database';

import CreateUserService from '../../src/services/CreateUserService';

let connection: Connection;

describe('User Test Suite', () => {
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
  });

  afterAll(async () => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
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
