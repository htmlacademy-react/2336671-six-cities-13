import { store } from './index';

export type State = ReturnType<typeof store.getState>;

export type AppDispather = typeof store.dispatch;
