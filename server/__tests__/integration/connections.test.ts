import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import app from '../../src/app';

import createConnection from '../../src/database';

import UsersRepository from '../../src/repositories/UsersRepository';
import ConnectionsRepository from '../../src/repositories/ConnectionsRepository';

let connection: Connection;

describe('Connection Test Suite', () => {
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
    await connection.query('DELETE FROM connections');
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should be able to make a connection', async () => {
    const usersRepository = new UsersRepository();
    const user_id = await usersRepository.create({
      name: 'any',
      avatar: 'any',
      whatsapp: 'any',
      bio: 'any',
      email: 'any@email.com',
      password: 'anypassword',
      lastname: 'any',
    });

    const response = await request(app).post('/connections').send({
      user_id,
    });

    expect(response.status).toBe(201);
  });

  it('should throw an error when user id is not provided', async () => {
    const response = await request(app).post('/connections').send({});

    expect(response.status).toBe(400);
  });

  it('should be able to list connections', async () => {
    const usersRepository = new UsersRepository();

    const first = await usersRepository.create({
      name: 'any',
      avatar: 'any',
      whatsapp: 'any',
      bio: 'any',
      email: 'any@email.com',
      password: 'anypassword',
      lastname: 'any',
    });

    const second = await usersRepository.create({
      name: 'other',
      avatar: 'other',
      whatsapp: 'other',
      bio: 'other',
      email: 'any2@email.com',
      password: 'anypassword',
      lastname: 'any',
    });

    const third = await usersRepository.create({
      name: 'other',
      avatar: 'other',
      whatsapp: 'other',
      bio: 'other',
      email: 'any3@email.com',
      password: 'anypassword',
      lastname: 'any',
    });

    const connectionsRepository = new ConnectionsRepository();

    await connectionsRepository.create({ user_id: first });

    await connectionsRepository.create({ user_id: second });

    await connectionsRepository.create({ user_id: third });

    const response = await request(app).get('/connections');

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(3);
  });
});
