import type { IHabit } from './habit.types';

export interface ICalendarHabit {
  id: string;
  habitId: IHabit['id'];
  comment: string;
  createdAt: string;
  updatedAt: string | null;
  completedAt: string | null;
  isoDate: string;
}

export interface ICalendarHabitWithHabit extends ICalendarHabit {
  habit: IHabit;
}
