import { AuthStatus, NameSpace } from '../../const';
import { getFakeUserData } from '../../utils/mocks';
import { getAuthStatus, getUserInfo } from './user-process.selectors';

describe ('User process selectors test', () => {

  const state = {
    [NameSpace.User]: {
      authStatus: AuthStatus.Unknown,
      userInfo: getFakeUserData(),
    },
  };

  it ('Should return auth status', () => {
    const { authStatus } = state[NameSpace.User];
    const result = getAuthStatus(state);
    expect(result).toBe(authStatus);
  });

  it ('Should return user data', () => {
    const { userInfo } = state[NameSpace.User];
    const result = getUserInfo(state);
    expect(result).toBe(userInfo);
  });

});
