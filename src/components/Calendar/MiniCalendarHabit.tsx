import HabitIcon from '@components/HabitIcon';
import type { ICalendarHabit } from '@t/calendarHabit.types';
import type { IHabit } from '@t/habit.types';
import type React from 'react';

interface IMiniCalendarHabitProps {
  habit: IHabit;
  calendarHabit: ICalendarHabit;
}

const MiniCalendarHabit: React.FC<IMiniCalendarHabitProps> = ({
  habit,
  calendarHabit,
}) => {
  return (
    <HabitIcon
      habit={habit}
      title={calendarHabit.comment}
      style={{ filter: calendarHabit.completedAt ? 'blur(1px)' : 'none' }}
      data-calendar-habit={calendarHabit.id}
      id={`calendarHabit${calendarHabit.id}`}
    />
  );
};

export default MiniCalendarHabit;
