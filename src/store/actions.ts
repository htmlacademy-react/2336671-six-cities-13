import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../const';
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
