import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, postReview, requireAuth, setFavoritesLoading, setNearbyPlacesLoading, setOfferDetailsLoading, setOffersLoading, setReviewsLoading, storeFavorites, storeNearbyPlaces, storeOfferDetails, storeOffers, storeReviews, storeUserInfo } from './actions';
import { SortType } from '../const';
import { AuthStatus } from '../const';
import { ShortOffer } from '../types/offer';
import { OfferDetails } from '../types/offer-details';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { Favorite } from '../types/favorite';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortType.Popular;

type InitialState = {
  city: string;
  offers: ShortOffer[];
  favorites: Favorite[];
  offerDetails: OfferDetails | null;
  reviews: Review[];
  nearbyPlaces: ShortOffer[];
  isOffersLoading: boolean;
  isFavoritesLoading: boolean;
  isOfferDetailsLoading: boolean;
  isReviewsLoading: boolean;
  isNearbyPlacesLoading: boolean;
  sort: SortType;
  authStatus: AuthStatus;
  userInfo: UserData | null;
  error: string | null;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  offerDetails: null,
  reviews: [],
  nearbyPlaces: [],
  sort: DEFAULT_SORT,
  authStatus: AuthStatus.Unknown,
  error: null,
  userInfo: null,
  isOffersLoading: false,
  isOfferDetailsLoading: false,
  isReviewsLoading: false,
  isNearbyPlacesLoading: false,
  favorites: [],
  isFavoritesLoading: false
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
    .addCase(storeFavorites, (state, action) => {
      state.favorites = action.payload;
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
    .addCase(setOffersLoading, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setFavoritesLoading, (state, action) => {
      state.isFavoritesLoading = action.payload;
    })
    .addCase(setOfferDetailsLoading, (state, action) => {
      state.isOfferDetailsLoading = action.payload;
    })
    .addCase(setReviewsLoading, (state, action) => {
      state.isReviewsLoading = action.payload;
    })
    .addCase(postReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(setNearbyPlacesLoading, (state, action) => {
      state.isNearbyPlacesLoading = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(storeUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});

export { reducer };
