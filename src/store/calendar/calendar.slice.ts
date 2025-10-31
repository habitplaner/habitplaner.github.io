import type { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ICalendarHabit } from '@t/calendarHabit.types';

import type { RootState } from '..';
import { getISODay } from './../../helpers/dateHelper';
import { calendarExtraReducers } from './calendar.actions';

export interface CalendarState {
  isLoading: boolean;
  loadingError?: SerializedError;
  isAdding: boolean;
  addingDate: string | null;
  addingError?: SerializedError;
  isSaving: boolean;
  savingDate: string | null;
  savingError?: SerializedError;
  calendarHabits: ICalendarHabit[];
  currentDate: string;
  selectedDate: string | null;
}

const initialState: CalendarState = {
  isLoading: false,
  isAdding: false,
  addingDate: null,
  isSaving: false,
  savingDate: null,
  calendarHabits: [],
  currentDate: getISODay(new Date()),
  selectedDate: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: calendarExtraReducers,
});

export const { setSelectedDate } = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
