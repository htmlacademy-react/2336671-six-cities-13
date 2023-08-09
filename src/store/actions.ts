import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthStatus, SortType } from '../const';
import { ShortOffer } from '../types/offer';

export const changeCity = createAction('main/changeCity', (value: string) => ({
  payload: value,
}));

export const changeSort = createAction('main/changeSort', (value: SortType) => ({
  payload: value,
}));

export const storeOffers = createAction('main/storeOffers', (value: ShortOffer[]) => ({
  payload: value,
}));

export const setOffersLoading = createAction<boolean>('main/setOffersLoading');

export const requireAuth = createAction<AuthStatus>('user/requireAuth');

export const redirectToRoute = createAction<AppRoute>('main/redirectRoute');
