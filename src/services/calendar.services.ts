import {
  firebaseDatabaseDeleteData,
  firebaseDatabaseGetData,
  firebaseDatabaseSetData,
  firebaseDatabaseUpdateData,
} from '@api/firebase.db';
import type { ICalendarHabit } from '@t/calendarHabit.types';

import { firebaseDatabaseGetUniqueKey } from './../api/firebase.db';

export const getUserCalendarHabits = async (userId: string, date: Date) => {
  const path = `habitsInCalendar/${userId}/${date.getFullYear()}/${date.getMonth()}`;
  const fbData = await firebaseDatabaseGetData(path);
  console.log('getUserCalendarHabits', path, fbData);
  return (
    (Object.values(fbData ?? {})
      .flat()
      .map((x) => Object.values(x as Record<string, ICalendarHabit>).flat())
      .flat() as ICalendarHabit[]) ?? []
  );
};

export const addUserCalendarHabit = async (
  userId: string,
  date: Date,
  calendarHabit: ICalendarHabit
) => {
  const path = `habitsInCalendar/${userId}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
  const newId = await firebaseDatabaseGetUniqueKey(path);
  const calendarHabitWithId = { ...calendarHabit, id: newId };
  await firebaseDatabaseSetData(`${path}/${newId}`, calendarHabitWithId);
  return calendarHabitWithId as ICalendarHabit;
};

export const updateUserCalendarHabit = async (
  userId: string,
  calendarHabit: ICalendarHabit
) => {
  const date = new Date(calendarHabit.isoDate);
  const path = `habitsInCalendar/${userId}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/${calendarHabit.id}`;
  await firebaseDatabaseUpdateData({ [path]: calendarHabit });
  return calendarHabit as ICalendarHabit;
};

export const deleteUserCalendarHabit = async (
  userId: string,
  calendarHabit: ICalendarHabit
) => {
  const date = new Date(calendarHabit.isoDate);
  const path = `habitsInCalendar/${userId}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/${calendarHabit.id}`;
  await firebaseDatabaseDeleteData(path);
  return calendarHabit as ICalendarHabit;
};
