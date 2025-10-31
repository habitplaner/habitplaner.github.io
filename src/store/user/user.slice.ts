import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IUser } from '@t/user.types';

import type { RootState } from '..';

export interface UserState {
  isAuthenticationLoading: boolean;
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticationLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticationLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticationLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setAuthenticationLoading } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
