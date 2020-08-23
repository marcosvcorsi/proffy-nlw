interface ScheduleItem {
  week_day: number;
  from: number;
  to: number;
}

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

export default interface CreateClassDTO {
  name?: string;
  avatar?: string;
  bio?: string;
  whatsapp?: string;
  subject: string;
  cost: number;
  class_schedules?: ScheduleItem[];
  schedules?: Schedule[];
  user_id?: number;
}
