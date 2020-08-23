interface ScheduleItem {
  week_day: number;
  from: number;
  to: number;
}

export default interface CreateClassDTO {
  subject: string;
  cost: number;
  class_schedules?: ScheduleItem[];
  user_id?: number;
}
