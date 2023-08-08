import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, requireAuth, storeOffers } from './actions';
import { SortType } from '../const';
import { AuthStatus } from '../const';
import { ShortOffer } from '../types/offer';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortType.Popular;

type InitialState = {
  city: string;
  offers: ShortOffer[];
  sort: SortType;
  authStatus: AuthStatus;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  sort: DEFAULT_SORT,
  authStatus: AuthStatus.Unknown,
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
    })
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    });
});

export { reducer };
