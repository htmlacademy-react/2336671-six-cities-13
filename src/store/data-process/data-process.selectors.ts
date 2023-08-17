import { NameSpace } from '../../const';
import { ShortOffer } from '../../types/offer';
import { State } from '../../types/state';
import {OfferDetails} from '../../types/offer-details';
import { Review } from '../../types/review';
import { Favorite } from '../../types/favorite';

export const getOffers = (state: Pick<State, NameSpace.Data>): ShortOffer[] => state[NameSpace.Data].offers;
export const getIsOffersLoading = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isOffersLoading;

export const getOfferDetails = (state: Pick<State, NameSpace.Data>): OfferDetails => state[NameSpace.Data].offerDetails as OfferDetails;
export const getIsOfferDetailsLoading = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isOfferDetailsLoading;

export const getReviews = (state: Pick<State, NameSpace.Data>): Review[] => state[NameSpace.Data].reviews;
export const getIsReviewsLoading = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isReviewsLoading;

export const getNearbyPlaces = (state: Pick<State, NameSpace.Data>): ShortOffer[] => state[NameSpace.Data].nearbyPlaces;
export const getIsNearbyPlacesLoading = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isNearbyPlacesLoading;

export const getFavorites = (state: Pick<State, NameSpace.Data>): Favorite[] => state[NameSpace.Data].favorites;
export const getIsFavoritesLoading = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isFavoritesLoading;
