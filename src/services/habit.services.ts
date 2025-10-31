import {
  firebaseDatabaseGetData,
  firebaseDatabaseSetData,
  firebaseDatabaseUpdateData,
} from '@api/firebase.db';
import type { IHabit } from '@t/habit.types';

import { firebaseDatabaseGetUniqueKey } from './../api/firebase.db';

export const getUserHabits = async (userId: string) => {
  const path = `habits/${userId}`;
  const fbData = await firebaseDatabaseGetData(path);
  console.log('xneek', fbData);
  return (fbData ?? {}) as { [habitId: string]: IHabit };
};

export const addUserHabit = async (userId: string, habit: IHabit) => {
  const path = `habits/${userId}`;
  const newId = await firebaseDatabaseGetUniqueKey(path);
  const habitWithId = { ...habit, id: newId };
  await firebaseDatabaseSetData(`${path}/${newId}`, habitWithId);
  return habitWithId as IHabit;
};

export const updateUserHabit = async (userId: string, habit: IHabit) => {
  const path = `habits/${userId}/${habit.id}`;
  await firebaseDatabaseUpdateData({ [path]: habit });
  return habit;
};
