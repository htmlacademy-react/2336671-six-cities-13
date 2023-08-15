import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { UserProcess } from '../../types/state';

const initialState: UserProcess = {
  authStatus: AuthStatus.Unknown,
  userInfo: null
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  },
});
