import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('main/changeCity', (value: string) => ({
  payload: value,
}));

export const showOffers = createAction('main/showOffers');
