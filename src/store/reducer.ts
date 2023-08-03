import { createReducer } from '@reduxjs/toolkit';
import { changeCity, showOffers } from './actions';
import { getCityOffers } from '../utils/common';
import { shortOffers } from '../mocks/offers';

const DEFAULT_CITY = 'Paris';

const initialState = {
  city: DEFAULT_CITY,
  offers: getCityOffers(DEFAULT_CITY, shortOffers),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(showOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
