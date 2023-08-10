import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, requireAuth, setLoading, storeNearbyPlaces, storeOfferDetails, storeOffers, storeReviews } from './actions';
import { SortType } from '../const';
import { AuthStatus } from '../const';
import { ShortOffer } from '../types/offer';
import { OfferDetails } from '../types/offer-details';
import { Review } from '../types/review';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortType.Popular;

type InitialState = {
  city: string;
  offers: ShortOffer[];
  offerDetails: OfferDetails | null;
  reviews: Review[];
  nearbyPlaces: ShortOffer[];
  isLoading: boolean;
  sort: SortType;
  authStatus: AuthStatus;
  error: string | null;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  offerDetails: null,
  reviews: [],
  nearbyPlaces: [],
  isLoading: false,
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
    .addCase(storeOfferDetails, (state, action) => {
      state.offerDetails = action.payload;
    })
    .addCase(storeReviews, (store, action) => {
      store.reviews = action.payload;
    })
    .addCase(storeNearbyPlaces, (store, action) => {
      store.nearbyPlaces = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    });
});

export { reducer };
