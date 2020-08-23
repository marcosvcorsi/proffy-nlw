import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import app from '../../src/app';

import createConnection from '../../src/database';

import CreateUserService from '../../src/services/CreateUserService';
import CreateSessionService from '../../src/services/CreateSessionService';
import CreateClassService from '../../src/services/CreateClassService';

let connection: Connection;
let user_id: number;
let userToken: string;

describe('Classes Test Suite', () => {
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
    await connection.query('DELETE FROM class_schedule');
    await connection.query('DELETE FROM classes');
    await connection.query('DELETE FROM users');

    const createUserService = new CreateUserService();

    const email = 'validemail@mail.com';
    const password = 'validpassword';

    user_id = await createUserService.execute({
      name: 'validname',
      lastname: 'validlastanme',
      email,
      password,
    });

    const createSessionService = new CreateSessionService();

    const { token } = await createSessionService.execute({ email, password });
    userToken = `Bearer ${token}`;
  });

  afterAll(async () => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a class', async () => {
    const response = await request(app)
      .post('/classes')
      .send({
        name: 'Marcos Corsi',
        avatar:
          'https://avatars3.githubusercontent.com/u/5308575?s=460&u=3edc49708de269c0df62f84c1681d6a5582f2ec4&v=4',
        whatsapp: '5546999739692',
        bio:
          'Software Engineer at @Gmobil. Javascript/Typescript and Java developer. Currently studying Node.js, ReactJS and React Native.',
        subject: 'Ciências',
        cost: 100,
        schedules: [
          { week_day: 1, from: '8:00', to: '12:00' },
          { week_day: 3, from: '10:00', to: '18:00' },
          { week_day: 5, from: '13:00', to: '14:00' },
        ],
      })
      .set('Authorization', userToken);

    expect(response.status).toBe(201);
  });

  it('should not be able to list classes without week day param', async () => {
    const response = await request(app)
      .get('/classes')
      .query({
        subject: 'any',
        time: 'any',
      })
      .set('Authorization', userToken);

    expect(response.status).toBe(400);
  });

  it('should not be able to list classes without subject param', async () => {
    const response = await request(app)
      .get('/classes')
      .query({
        week_day: 'any',
        time: 'any',
      })
      .set('Authorization', userToken);

    expect(response.status).toBe(400);
  });

  it('should not be able to list classes without time param', async () => {
    const response = await request(app)
      .get('/classes')
      .query({
        week_day: 'any',
        subject: 'any',
      })
      .set('Authorization', userToken);

    expect(response.status).toBe(400);
  });

  it('should  be able to list classes', async () => {
    const createClassService = new CreateClassService();

    await createClassService.execute({
      subject: 'any',
      cost: 8,
      user_id,
      schedules: [
        { week_day: 0, from: '7:30', to: '12:00' },
        { week_day: 3, from: '10:00', to: '18:00' },
        { week_day: 5, from: '13:00', to: '14:00' },
      ],
    });

    const response = await request(app)
      .get('/classes')
      .query({
        week_day: '0',
        subject: 'any',
        time: '8:00',
      })
      .set('Authorization', userToken);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ subject: 'any' })]),
    );
  });
});
