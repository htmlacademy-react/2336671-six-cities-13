import { internet, name, helpers } from 'faker';
import { UserData } from '../types/user-data';

export const getFakeUserData = (): UserData => ({
  name: name.title(),
  avatarUrl: internet.avatar(),
  isPro: true,
  email: internet.email(),
  token: helpers.randomize(),
});
