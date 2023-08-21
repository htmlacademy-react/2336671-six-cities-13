import { AuthStatus } from '../../const';
import { getFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process.slice';

describe ('User Process slise', () => {

  const userInfo = getFakeUserData();
  it('Should return state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {authStatus: AuthStatus.Auth, userInfo: userInfo};
    const result = userProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {authStatus: AuthStatus.Unknown, userInfo: null};
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Shoult return "authStatus" to "AuthStatus.Auth", "userInfo" to user info with "checkAuthAction.fulfilled"', () => {
    const expectedState = { authStatus: AuthStatus.Auth, userInfo: userInfo};
    const result = userProcess.reducer(undefined, checkAuthAction.fulfilled(userInfo, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('Shoult return "authStatus" to "AuthStatus.NoAuth", "userInfo" to "null" with "checkAuthAction.rejected"', () => {
    const expectedState = { authStatus: AuthStatus.NoAuth, userInfo: null};
    const result = userProcess.reducer(undefined, checkAuthAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Shoult return "authStatus" to "AuthStatus.Auth", "userInfo" to user info with "loginAction.fulfilled"', () => {
    const expectedState = { authStatus: AuthStatus.Auth, userInfo: userInfo };
    const authData = {login: '', password: ''};
    const result = userProcess.reducer(undefined, loginAction.fulfilled(userInfo, '', authData));
    expect(result).toEqual(expectedState);
  });

  it('Shoult return "authStatus" to "AuthStatus.NoAuth", "userInfo" to "null" with "loginAction.rejected"', () => {
    const expectedState = { authStatus: AuthStatus.NoAuth, userInfo: null};
    const result = userProcess.reducer(undefined, loginAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Shoult return "authStatus" to "AuthStatus.NoAuth", "userInfo" to null with "logoutAction.fulfilled"', () => {
    const initialState = { authStatus: AuthStatus.Auth, userInfo: userInfo };
    const expectedState = { authStatus: AuthStatus.NoAuth, userInfo: null };
    const result = userProcess.reducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

});
