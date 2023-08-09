import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, requireAuth, setError, setOffersLoading, storeOffers } from './actions';
import { SortType } from '../const';
import { AuthStatus } from '../const';
import { ShortOffer } from '../types/offer';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortType.Popular;

type InitialState = {
  city: string;
  offers: ShortOffer[];
  isOffersLoading: boolean;
  sort: SortType;
  authStatus: AuthStatus;
  error: string | null;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
  sort: DEFAULT_SORT,
  authStatus: AuthStatus.Unknown,
  error: null,
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
    .addCase(setOffersLoading, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
