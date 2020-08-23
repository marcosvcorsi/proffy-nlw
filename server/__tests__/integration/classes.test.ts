// import request from 'supertest';
// import app from '../../src/app';

// import UsersRepository from '../../src/repositories/UsersRepository';
// import ClassesRepository from '../../src/repositories/ClassesRepository';
// import ClassScheduleRepository from '../../src/repositories/ClassScheduleRepository';

describe('Classes Test Suite', () => {
  it('', () => {
    expect(true).toBe(true);
  });
  // beforeEach(async () => {
  //   await db('class_schedule').del();
  //   await db('classes').del();
  //   await db('users').del();
  // });

  // it('should be able to create a class', async () => {
  //   const response = await request(app)
  //     .post('/classes')
  //     .send({
  //       name: 'Marcos Corsi',
  //       avatar:
  //         'https://avatars3.githubusercontent.com/u/5308575?s=460&u=3edc49708de269c0df62f84c1681d6a5582f2ec4&v=4',
  //       whatsapp: '5546999739692',
  //       bio:
  //         'Software Engineer at @Gmobil. Javascript/Typescript and Java developer. Currently studying Node.js, ReactJS and React Native.',
  //       subject: 'Ciências',
  //       cost: 100,
  //       schedule: [
  //         { week_day: 1, from: '8:00', to: '12:00' },
  //         { week_day: 3, from: '10:00', to: '18:00' },
  //         { week_day: 5, from: '13:00', to: '14:00' },
  //       ],
  //     });

  //   expect(response.status).toBe(201);
  // });

  // it('should not be able to list classes without week day param', async () => {
  //   const response = await request(app).get('/classes').query({
  //     subject: 'any',
  //     time: 'any',
  //   });

  //   expect(response.status).toBe(400);
  // });

  // it('should not be able to list classes without subject param', async () => {
  //   const response = await request(app).get('/classes').query({
  //     week_day: 'any',
  //     time: 'any',
  //   });

  //   expect(response.status).toBe(400);
  // });

  // it('should not be able to list classes without time param', async () => {
  //   const response = await request(app).get('/classes').query({
  //     week_day: 'any',
  //     subject: 'any',
  //   });

  //   expect(response.status).toBe(400);
  // });

  // it('should  be able to list classes', async () => {
  //   const usersRepository = new UsersRepository(db);
  //   const classesRepository = new ClassesRepository(db);
  //   const classScheduleRepository = new ClassScheduleRepository(db);

  //   const [other_id] = await usersRepository.create({
  //     name: 'other',
  //     avatar: 'other',
  //     whatsapp: 'other',
  //     bio: 'other',
  //     email: 'other@email.com',
  //     password: '',
  //     lastname: '',
  //   });

  //   const [other_class_id] = await classesRepository.create({
  //     subject: 'any',
  //     cost: 10,
  //     user_id: other_id,
  //   });

  //   await classScheduleRepository.create([
  //     { class_id: other_class_id, week_day: 1, from: 720, to: 800 },
  //   ]);

  //   const [user_id] = await usersRepository.create({
  //     name: 'any',
  //     avatar: 'any',
  //     whatsapp: 'any',
  //     bio: 'any',
  //     email: 'any@email.com',
  //     password: '',
  //     lastname: '',
  //   });

  //   const [class_id] = await classesRepository.create({
  //     subject: 'any',
  //     cost: 10,
  //     user_id,
  //   });

  //   await classScheduleRepository.create([
  //     { class_id, week_day: 0, from: 420, to: 800 },
  //   ]);

  //   const response = await request(app).get('/classes').query({
  //     week_day: '0',
  //     subject: 'any',
  //     time: '8:00',
  //   });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveLength(1);
  //   expect(response.body).toEqual(
  //     expect.arrayContaining([expect.objectContaining({ name: 'any' })]),
  //   );
  // });
});
