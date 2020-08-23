import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from './User';
import ClassSchedule from './ClassSchedule';

@Entity('classes')
class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  cost: number;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ClassSchedule, class_schedule => class_schedule.class, {
    cascade: ['insert'],
  })
  class_schedules: ClassSchedule[];
}

export default Class;
