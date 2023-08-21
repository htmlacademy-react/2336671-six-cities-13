import { AuthStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const getAuthStatus = (state: Pick<State, NameSpace.User>): AuthStatus => state[NameSpace.User].authStatus;
export const getUserInfo = (state: Pick<State, NameSpace.User>): UserData => state[NameSpace.User].userInfo as UserData;
