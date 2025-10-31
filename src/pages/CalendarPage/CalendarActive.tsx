import 'drag-drop-touch';

import Calendar from '@components/Calendar';
import MiniCalendarHabit from '@components/Calendar/MiniCalendarHabit';
import { getISODay } from '@helpers/dateHelper';
import { addCalendarHabit } from '@store/calendar/calendar.actions';
import {
  selectCalendar,
  setSelectedDate,
} from '@store/calendar/calendar.slice';
import { selectHabits } from '@store/habits/habits.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import type { ICalendarHabit } from '@t/calendarHabit.types';
import type React from 'react';

const CalendarActive = () => {
  const { isLoading, currentDate, selectedDate, calendarHabits } =
    useAppSelector(selectCalendar);
  const { habits } = useAppSelector(selectHabits);
  const dispatch = useAppDispatch();

  const daysHabitsMap = calendarHabits.reduce<Record<string, ICalendarHabit[]>>(
    (acc, ch) => {
      if (!acc[ch.isoDate]) {
        acc[ch.isoDate] = [];
      }
      acc[ch.isoDate].push(ch);
      return acc;
    },
    {}
  );

  return (
    <Calendar
      date={new Date(currentDate)}
      onDayClick={(d) => dispatch(setSelectedDate(getISODay(d)))}
      selectedDate={selectedDate}
      calendarDayContentMap={Object.entries(daysHabitsMap).reduce<{
        [isoDay: string]: React.ReactNode;
      }>((acc, [isoDay, calendarHabits]) => {
        acc[isoDay] = (
          <>
            {calendarHabits.map((ch) => {
              return (
                <MiniCalendarHabit
                  habit={habits[ch.habitId]}
                  calendarHabit={ch}
                  key={ch.id}
                />
              );
            })}
          </>
        );
        return acc;
      }, {})}
      onDropToDate={(habitId, date) => {
        dispatch(addCalendarHabit({ date, habitId }));
      }}
      loading={isLoading}
    />
  );
};

export default CalendarActive;
