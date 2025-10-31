import {
  type ActionReducerMapBuilder,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {
  addUserHabit,
  getUserHabits,
  updateUserHabit,
} from '@services/habit.services';
import type { IHabit } from '@t/habit.types';

import type { RootState } from '..';
import type { HabitsState } from './habits.slice';

export const getHabits = createAsyncThunk(
  'habits/getList',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const userId = state.user.user?.id;
    if (!userId) throw new Error('Habits list only for authorized user');

    return getUserHabits(userId);
  }
);

export const addHabit = createAsyncThunk<IHabit, IHabit>(
  'habits/add',
  async (habit, { getState }) => {
    const state = getState() as RootState;
    const userId = state.user.user?.id;
    if (!userId) throw new Error('Habit add only for authorized user');

    return addUserHabit(userId, habit);
  }
);

export const updateHabit = createAsyncThunk<IHabit, IHabit>(
  'habits/update',
  async (habit, { getState }) => {
    const state = getState() as RootState;
    const userId = state.user.user?.id;
    if (!userId) throw new Error('Habit update only for authorized user');

    return updateUserHabit(userId, habit);
  }
);

export const habitsExtraReducers = (
  builder: ActionReducerMapBuilder<HabitsState>
) => {
  builder
    .addCase(getHabits.pending, (state) => {
      state.isLoading = true;
      state.loadingError = undefined;
    })
    .addCase(getHabits.fulfilled, (state, action) => {
      state.isLoading = false;
      state.habits = action.payload;
    })
    .addCase(getHabits.rejected, (state, action) => {
      state.isLoading = false;
      state.loadingError = action.error;
    })
    // save habit
    .addCase(addHabit.pending, (state) => {
      state.isSaving = true;
      state.savingError = undefined;
    })
    .addCase(addHabit.fulfilled, (state, action) => {
      state.isSaving = false;
      state.habits = { ...state.habits, [action.payload.id]: action.payload };
    })
    .addCase(addHabit.rejected, (state, action) => {
      state.isSaving = false;
      state.savingError = action.error;
    })
    // update habit
    .addCase(updateHabit.pending, (state) => {
      state.isSaving = true;
      state.savingError = undefined;
    })
    .addCase(updateHabit.fulfilled, (state, action) => {
      state.isSaving = false;
      state.habits = { ...state.habits, [action.payload.id]: action.payload };
    })
    .addCase(updateHabit.rejected, (state, action) => {
      state.isSaving = false;
      state.savingError = action.error;
    });
};
