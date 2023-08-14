import { createAction } from '@reduxjs/toolkit';
import { AuthStatus, SortType } from '../const';
import { ShortOffer } from '../types/offer';
import { OfferDetails } from '../types/offer-details';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { Favorite } from '../types/favorite';

export const changeCity = createAction<string>('main/changeCity');

export const changeSort = createAction<SortType>('main/changeSort');

export const storeOffers = createAction<ShortOffer[]>('main/storeOffers');
export const setOffersLoading = createAction<boolean>('main/setOffersLoading');

export const storeFavorites = createAction<Favorite[]>('main/storeFavorites');
export const setFavoritesLoading = createAction<boolean>('main/setFavoritesLoading');

export const storeOfferDetails = createAction<OfferDetails>('main/storeOfferDetails');
export const setOfferDetailsLoading = createAction<boolean>('main/setOfferDetailsLoading');

export const storeReviews = createAction<Review[]>('main/storeReviews');
export const setReviewsLoading = createAction<boolean>('main/setReviewsLoading');
export const postReview = createAction<Review>('main/postReview');

export const storeNearbyPlaces = createAction<ShortOffer[]>('main/storeNearbyPlaces');
export const setNearbyPlacesLoading = createAction<boolean>('main/setNearbyPlacesLoading');

export const storeUserInfo = createAction<UserData>('main/storeUserInfo');

export const requireAuth = createAction<AuthStatus>('user/requireAuth');

export const redirectToRoute = createAction<string>('main/redirectRoute');
