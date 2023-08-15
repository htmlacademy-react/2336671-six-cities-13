import { AuthStatus, SortType } from '../const';
import { store } from '../store/index';
import { Favorite } from './favorite';
import { ShortOffer } from './offer';
import { OfferDetails } from './offer-details';
import { Review } from './review';
import { UserData } from './user-data';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authStatus: AuthStatus;
  userInfo: UserData | null;
};

export type DataProcess = {
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
}

export type AppProcess = {
  city: string;
  sort: SortType;
  error: string | null;
};
