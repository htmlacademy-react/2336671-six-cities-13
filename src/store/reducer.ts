import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort } from './actions';
import { getCityOffers } from '../utils/common';
import { shortOffers } from '../mocks/offers';
import { SortType } from '../const';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortType.Popular;

const initialState = {
  city: DEFAULT_CITY,
  offers: getCityOffers(DEFAULT_CITY, shortOffers,),
  sort: DEFAULT_SORT,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.offers = getCityOffers(state.city, shortOffers);
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
    });
});

export { reducer };
