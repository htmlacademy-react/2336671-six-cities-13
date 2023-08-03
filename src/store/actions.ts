import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../const';

export const changeCity = createAction('main/changeCity', (value: string) => ({
  payload: value,
}));

export const changeSort = createAction('main/changeSort', (value: SortType) => ({
  payload: value,
}));

export const showOffers = createAction('main/showOffers');
