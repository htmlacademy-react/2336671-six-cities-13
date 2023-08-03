import { createAction } from '@reduxjs/toolkit';
import { ShortOffer } from '../types/offer';

export const changeCity = createAction('main/changeCity', (value: string) => ({
  payload: value,
}));

export const showOffers = createAction('main/showOffers', (value: ShortOffer[]) => ({
  payload: value,
}));
