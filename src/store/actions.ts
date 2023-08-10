import { createAction } from '@reduxjs/toolkit';
import { AuthStatus, SortType } from '../const';
import { ShortOffer } from '../types/offer';
import { OfferDetails } from '../types/offer-details';
import { Review } from '../types/review';

export const changeCity = createAction<string>('main/changeCity');

export const changeSort = createAction<SortType>('main/changeSort');

export const storeOffers = createAction<ShortOffer[]>('main/storeOffers');

export const storeOfferDetails = createAction<OfferDetails>('main/storeOfferDetails');

export const storeReviews = createAction<Review[]>('main/storeReviews');

export const storeNearbyPlaces = createAction<ShortOffer[]>('main/storeNearbyPlaces');

export const setLoading = createAction<boolean>('main/setLoading');

export const requireAuth = createAction<AuthStatus>('user/requireAuth');

export const redirectToRoute = createAction<string>('main/redirectRoute');
