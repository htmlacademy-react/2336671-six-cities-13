import { Favorite } from '../../types/favorite';
import { getFakeFavorite, getFakeOfferDetails, getFakeReview, getFakeShortOffer } from '../../utils/moks';
import { fetchNearbyPlacesAction } from '../api-actions';
import { fetchReviewsAction } from '../api-actions';
import { fetchOfferDetailsAction } from '../api-actions';
import { fetchFavoritesAction, fetchOffersAction } from '../api-actions';
import { dataProcess, removeFavorites } from './data-process.slice';

describe('Data prosecc slice', () => {

  const offers = getFakeShortOffer();
  const favorites = getFakeFavorite();
  const offerDetails = getFakeOfferDetails();
  const reviews = getFakeReview();

  it('Should return state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      offers: [offers],
      favorites: [favorites],
      offerDetails: offerDetails,
      reviews: [reviews],
      nearbyPlaces: [offers],
      isOffersLoading: true,
      isFavoritesLoading: false,
      isOfferDetailsLoading: true,
      isReviewsLoading: true,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };

    const result = dataProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should remove Favorites array with "removeFavorites" action', () => {
    const initialState = {
      offers: [offers],
      favorites: [favorites],
      offerDetails: offerDetails,
      reviews: [reviews],
      nearbyPlaces: [offers],
      isOffersLoading: true,
      isFavoritesLoading: false,
      isOfferDetailsLoading: true,
      isReviewsLoading: true,
      isNearbyPlacesLoading: false
    };

    const expectedFavorites: Favorite[] = [];
    const result = dataProcess.reducer(initialState, removeFavorites);
    expect(result.favorites).toEqual(expectedFavorites);
  });

  it('Should set "isOffersLoading" to "true" with "fetchOffersAction.pending"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };

    const expectedState = true;
    const result = dataProcess.reducer(initialState, fetchOffersAction.pending);
    expect(result.isOffersLoading).toEqual(expectedState);
  });

  it('Should set "offers" to array of ShortOffer, "isOffersLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: true,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const expectedState = {
      offers: [offers],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchOffersAction.fulfilled([offers], '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('Should set "isOffersLoading" to "false" with "fetchOffersAction.rejected"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: true,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Should set "isFavoritesLoading" to "true" with "fetchFavoritesAction.pending"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };

    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: true,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchFavoritesAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Should set "favorites" to array of Favorite, "isFavoritesLoading" to "false" with "fetchFavoritesAction.fulfilled"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: true,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const expectedState = {
      offers: [],
      favorites: [favorites],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchFavoritesAction.fulfilled([favorites], '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('Should set "isFavoritesLoading" to "false" with "fetchFavoritesAction.rejected"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: true,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchFavoritesAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Should set "isOfferDetailsLoading" to "true" with "fetchFavoritesAction.pending"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };

    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: true,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchOfferDetailsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Should set "offerDetails" to OfferDetails, "isOfferDetailsLoading" to "false" with "fetchOfferDetailsAction.fulfilled"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchOfferDetailsAction.fulfilled(offerDetails, '', '123'));
    expect(result).toEqual(expectedState);
  });

  it('Should set "isOfferDetailsLoading" to "false" with "fetchOfferDetailsAction.rejected"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: true,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: null,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchOfferDetailsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Should set "isReviewsLoading" to "true" with "fetchReviewsAction.pending"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };

    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: true,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchReviewsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Should set "reviews" to array of Review, "isReviewsLoading" to "false" with "fetchReviewsAction.fulfilled"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: true,
      isNearbyPlacesLoading: false
    };
    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [reviews],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchReviewsAction.fulfilled([reviews], '', '123'));
    expect(result).toEqual(expectedState);
  });

  it('Should set "isReviewsLoading" to "false" with "fetchReviewsAction.rejected"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: true,
      isNearbyPlacesLoading: false
    };
    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchReviewsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Should set "isNearbyPlacesLoading" to "true" with "fetchNearbyPlacesAction.pending"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };

    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: true
    };
    const result = dataProcess.reducer(initialState, fetchNearbyPlacesAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Should set "nearbyPlaces" to array of ShortOffer, "isNearbyPlacesLoading" to "false" with "fetchNearbyPlacesAction.fulfilled"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [reviews],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: true
    };
    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [reviews],
      nearbyPlaces: [offers],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchNearbyPlacesAction.fulfilled([offers], '', '123'));
    expect(result).toEqual(expectedState);
  });

  it('Should set "isNearbyPlacesLoading" to "false" with "fetchNearbyPlacesAction.rejected"', () => {
    const initialState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [reviews],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: true
    };
    const expectedState = {
      offers: [],
      favorites: [],
      offerDetails: offerDetails,
      reviews: [reviews],
      nearbyPlaces: [],
      isOffersLoading: false,
      isFavoritesLoading: false,
      isOfferDetailsLoading: false,
      isReviewsLoading: false,
      isNearbyPlacesLoading: false
    };
    const result = dataProcess.reducer(initialState, fetchNearbyPlacesAction.rejected);
    expect(result).toEqual(expectedState);
  });

});
