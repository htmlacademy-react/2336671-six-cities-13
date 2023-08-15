import { NameSpace } from '../../const';
import { ShortOffer } from '../../types/offer';
import { State } from '../../types/state';
import {OfferDetails} from '../../types/offer-details';
import { Review } from '../../types/review';
import { Favorite } from '../../types/favorite';

export const getOffers = (state: State): ShortOffer[] => state[NameSpace.Data].offers;
export const getIsOffersLoading = (state: State): boolean => state[NameSpace.Data].isOffersLoading;

export const getOfferDetails = (state: State): OfferDetails => state[NameSpace.Data].offerDetails as OfferDetails;
export const getIsOfferDetailsLoading = (state: State): boolean => state[NameSpace.Data].isOfferDetailsLoading;

export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getIsReviewsLoading = (state: State): boolean => state[NameSpace.Data].isReviewsLoading;

export const getNearbyPlaces = (state: State): ShortOffer[] => state[NameSpace.Data].nearbyPlaces;
export const getIsNearbyPlacesLoading = (state: State): boolean => state[NameSpace.Data].isNearbyPlacesLoading;

export const getFavorites = (state: State): Favorite[] => state[NameSpace.Data].favorites;
export const getIsFavoritesLoading = (state: State): boolean => state[NameSpace.Data].isFavoritesLoading;
