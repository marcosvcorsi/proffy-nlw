interface Schedule {
  week_day: string;
  from: number;
  to: number;
  class_id: number;
}

export default interface CreateClassScheduleDTO {
  schedules: Schedule[];
}
