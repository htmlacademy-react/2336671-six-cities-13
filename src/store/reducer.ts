import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, storeOffers } from './actions';
import { shortOffers } from '../mocks/offers';
import { SortType } from '../const';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortType.Popular;

const initialState = {
  city: DEFAULT_CITY,
  offers: shortOffers,
  sort: DEFAULT_SORT,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(storeOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
