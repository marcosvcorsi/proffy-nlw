// import UsersRepository from '../repositories/UsersRepository';
// import ClassesRepository from '../repositories/ClassesRepository';
// import ClassScheduleRepository from '../repositories/ClassScheduleRepository';
// import convertHourToMinutes from '../utils/convertHourToMinutes';
import CreateClassDTO from '../dtos/CreateClassDTO';

export default class CreateClassService {
  public async execute({
    name,
    avatar,
    bio,
    whatsapp,
    subject,
    cost,
    schedule,
  }: CreateClassDTO) {
    // const trx = await db.transaction();
    // try {
    //   const usersRepository = new UsersRepository(trx);
    //   const [user_id] = await usersRepository.create({
    //     name,
    //     avatar,
    //     bio,
    //     whatsapp,
    //   });
    //   const classesRepository = new ClassesRepository(trx);
    //   const [class_id] = await classesRepository.create({
    //     subject,
    //     cost,
    //     user_id,
    //   });
    //   const classSchedules = schedule.map(scheduleItem => {
    //     return {
    //       ...scheduleItem,
    //       week_day: Number(scheduleItem.week_day),
    //       from: convertHourToMinutes(scheduleItem.from),
    //       to: convertHourToMinutes(scheduleItem.to),
    //       class_id,
    //     };
    //   });
    //   const classScheduleRepository = new ClassScheduleRepository(trx);
    //   await classScheduleRepository.create(classSchedules);
    //   await trx.commit();
    // } catch (err) {
    //   await trx.rollback();
    // }
  }
}
