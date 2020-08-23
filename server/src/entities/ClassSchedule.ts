import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Class from './Class';

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

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ClassSchedule;
