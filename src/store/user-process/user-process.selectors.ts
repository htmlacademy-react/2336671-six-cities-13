import { AuthStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authStatus;
export const getUserInfo = (state: State): UserData => state[NameSpace.User].userInfo as UserData;
