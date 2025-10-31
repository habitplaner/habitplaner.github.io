import {
  type Action,
  configureStore,
  type ThunkAction,
} from '@reduxjs/toolkit';

import calendarReducer from './calendar/calendar.slice';
import habitsReducer from './habits/habits.slice';
import userReducer from './user/user.slice';
// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    habits: habitsReducer,
    calendar: calendarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
