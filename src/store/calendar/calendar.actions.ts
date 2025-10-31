import { accentCalendarHabit } from '@helpers/animateHelper';
import { getISODay } from '@helpers/dateHelper';
import {
  type ActionReducerMapBuilder,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  addUserCalendarHabit,
  deleteUserCalendarHabit,
  getUserCalendarHabits,
  updateUserCalendarHabit,
} from '@services/calendar.services';
import type { ICalendarHabit } from '@t/calendarHabit.types';

import type { RootState } from '..';
import type { CalendarState } from './calendar.slice';

export const getCalendarHabits = createAsyncThunk<ICalendarHabit[], string>(
  'calendar/getHabits',
  async (d, { getState }) => {
    const state = getState() as RootState;
    const userId = state.user.user?.id;
    if (!userId) throw new Error('Habits list only for authorized user');

    return getUserCalendarHabits(userId, new Date(d));
  }
);
export const addCalendarHabit = createAsyncThunk<
  ICalendarHabit,
  { date: Date; habitId: string }
>('calendar/addCalendarHabit', async ({ date, habitId }, { getState }) => {
  const state = getState() as RootState;
  const userId = state.user.user?.id;
  if (!userId) throw new Error('Habits list only for authorized user');

  const calendarHabit: ICalendarHabit = {
    id: '',
    habitId,
    comment: '',
    createdAt: new Date().toISOString(),
    updatedAt: null,
    completedAt: null,
    isoDate: getISODay(date),
  };

  const addedHabit = await addUserCalendarHabit(userId, date, calendarHabit);
  accentCalendarHabit(addedHabit.id);
  return addedHabit;
});
export const updateCalendarHabit = createAsyncThunk<
  ICalendarHabit,
  ICalendarHabit
>(
  'calendar/updateUserCalendarHabit',
  async (updatedCalendarHabit, { getState }) => {
    const state = getState() as RootState;
    const userId = state.user.user?.id;
    if (!userId) throw new Error('Habits list only for authorized user');

    const calendarHabit: ICalendarHabit = {
      ...updatedCalendarHabit,
      updatedAt: new Date().toISOString(),
    };

    const updatedCHabit = await updateUserCalendarHabit(userId, calendarHabit);
    accentCalendarHabit(updatedCHabit.id);
    return updatedCHabit;
  }
);

export const deleteCalendarHabit = createAsyncThunk<
  ICalendarHabit,
  ICalendarHabit
>('calendar/deleteCalendarHabit', async (deleteCalendarHabit, { getState }) => {
  const state = getState() as RootState;
  const userId = state.user.user?.id;
  if (!userId) throw new Error('Habits list only for authorized user');

  const updatedCHabit = await deleteUserCalendarHabit(
    userId,
    deleteCalendarHabit
  );

  return updatedCHabit;
});

export const calendarExtraReducers = (
  builder: ActionReducerMapBuilder<CalendarState>
) => {
  builder
    .addCase(getCalendarHabits.pending, (state, { meta }) => {
      state.currentDate = meta.arg;
      state.isLoading = true;
      state.loadingError = undefined;
      state.selectedDate = null;
    })
    .addCase(
      getCalendarHabits.fulfilled,
      (state, action: PayloadAction<ICalendarHabit[]>) => {
        state.isLoading = false;
        state.calendarHabits = action.payload;
      }
    )
    .addCase(getCalendarHabits.rejected, (state, action) => {
      state.isLoading = false;
      state.loadingError = action.error;
    })
    // add calendar habit
    .addCase(addCalendarHabit.pending, (state, { meta }) => {
      state.addingDate = getISODay(meta.arg.date);
      state.isAdding = true;
      state.addingError = undefined;
    })
    .addCase(
      addCalendarHabit.fulfilled,
      (state, action: PayloadAction<ICalendarHabit>) => {
        state.addingDate = null;
        state.isAdding = false;
        state.calendarHabits = [...state.calendarHabits, action.payload];
      }
    )
    .addCase(addCalendarHabit.rejected, (state, action) => {
      state.isAdding = false;
      state.addingError = action.error;
    })
    // update calendar habit
    .addCase(updateCalendarHabit.pending, (state, { meta }) => {
      state.savingDate = meta.arg.isoDate;
      state.isSaving = true;
      state.savingError = undefined;
    })
    .addCase(
      updateCalendarHabit.fulfilled,
      (state, action: PayloadAction<ICalendarHabit>) => {
        state.savingDate = null;
        state.isSaving = false;
        state.calendarHabits = state.calendarHabits.map((ch) =>
          ch.id === action.payload.id ? action.payload : ch
        );
      }
    )
    .addCase(updateCalendarHabit.rejected, (state, action) => {
      state.isSaving = false;
      state.savingError = action.error;
    }) // update calendar habit
    .addCase(deleteCalendarHabit.pending, (state, { meta }) => {
      state.savingDate = meta.arg.isoDate;
      state.isSaving = true;
      state.savingError = undefined;
    })
    .addCase(
      deleteCalendarHabit.fulfilled,
      (state, action: PayloadAction<ICalendarHabit>) => {
        state.savingDate = null;
        state.isSaving = false;
        state.calendarHabits = state.calendarHabits.filter(
          (ch) => ch.id !== action.payload.id
        );
      }
    )
    .addCase(deleteCalendarHabit.rejected, (state, action) => {
      state.isSaving = false;
      state.savingError = action.error;
    });
};
