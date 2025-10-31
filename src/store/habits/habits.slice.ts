import type { SerializedError } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IHabit } from '@t/habit.types';

import type { RootState } from '..';
import { habitsExtraReducers } from './habits.actions';

export interface HabitsState {
  isLoading: boolean;
  loadingError?: SerializedError;
  isSaving: boolean;
  savingError?: SerializedError;
  habits: Record<string, IHabit>;
}

const initialState: HabitsState = {
  isLoading: false,
  isSaving: false,
  habits: {},
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers: habitsExtraReducers,
});

// export const {} = userSlice.actions;

export const selectHabits = (state: RootState) => state.habits;

export default habitsSlice.reducer;
