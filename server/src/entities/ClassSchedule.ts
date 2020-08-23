import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('class_schedule')
class ClassSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  week_day: number;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  class_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ClassSchedule;
