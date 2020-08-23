interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default interface CreateClassDTO {
  name: string;
  avatar: string;
  bio: string;
  whatsapp: string;
  subject: string;
  cost: number;
  schedule: ScheduleItem[];
  user_id?: number;
}
