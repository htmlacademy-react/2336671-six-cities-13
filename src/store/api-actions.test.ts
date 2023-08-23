import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes } from '../utils/mocks';
import { State } from '../types/state';
import { APIRoute, AuthStatus, SortType } from '../const';

import { AuthData } from '../types/auth-data';
import * as tokenStorage from '../services/token';
import { redirectToRoute } from './actions';
import { addToFavoriteAction, checkAuthAction, fetchFavoritesAction, fetchNearbyPlacesAction, fetchOfferDetailsAction, fetchOffersAction, fetchReviewsAction, loginAction, logoutAction, submitReviewAction } from './api-actions';
import { removeFavorites } from './data-process/data-process.slice';
import { getFakeShortOffer, getFakeOfferDetails, getFakeReview, getFakeFavorite } from '../utils/mocks';

describe('Async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      APP: {
        city: 'Paris',
        sort: SortType.Popular,
      },
      USER: {
        authStatus: AuthStatus.Unknown,
        userInfo: null
      },
      DATA: {
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
      }
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending", "fetchFavoritesAction.pending", "checkAuthAction.fulfilled" when server response 200', async () => {

      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);
      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        fetchFavoritesAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('Should dispatch "checkAuthAction.pending", "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('Should dispatch "loginAction.pending", "fetchOffersAction.pending", "fetchFavoritesAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async () => {
      const authData = { login: 'test@test.ru', password: '1111' };
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(authData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        fetchOffersAction.pending.type,
        fetchFavoritesAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('Should call "saveToken" once with the received token', async () => {
      const authData: AuthData = { login: 'test@test.ru', password: '1111' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(authData));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });

    it('Should dispatch "loginAction.pending", "loginAction.rejected" when server response 400', async () => {
      const authData = { login: 'test@test.ru', password: '1111' };
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400, fakeServerReply);

      await store.dispatch(loginAction(authData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });

  describe('Logout action', () => {
    it('Should dispatch "loginAction.pending", "removeFavorites", "fetchOffersAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        removeFavorites.type,
        fetchOffersAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('Should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled" when server response 200', async () => {
      const mocksOffers = [getFakeShortOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mocksOffers);

      await store.dispatch(fetchOffersAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mocksOffers);
    });

    it('Should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferDetailsAction', () => {
    it('Should dispatch "fetchOfferDetailsAction.pending", "fetchOfferDetailsAction.fulfilled" when server response 200', async () => {
      const mocksOfferDetails = getFakeOfferDetails();
      const id = '123';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}`).reply(200, mocksOfferDetails);

      await store.dispatch(fetchOfferDetailsAction(id));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferDetailsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferDetailsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferDetailsAction.pending.type,
        fetchOfferDetailsAction.fulfilled.type,
      ]);

      expect(fetchOfferDetailsActionFulfilled.payload)
        .toEqual(mocksOfferDetails);
    });

    it('Should dispatch "fetchOfferDetailsAction.pending", "fetchOfferDetailsAction.rejected" when server response 400', async () => {
      const id = '123';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}`).reply(400);

      await store.dispatch(fetchOfferDetailsAction(id));
      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchOfferDetailsAction.pending.type,
        fetchOfferDetailsAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('Should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled" when server response 200', async () => {
      const mocksReviews = [getFakeReview()];
      const id = '1111';
      mockAxiosAdapter.onGet(`${APIRoute.Reviews}/${id}`).reply(200, mocksReviews);

      await store.dispatch(fetchReviewsAction(id));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mocksReviews);
    });

    it('Should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      const id = '1111';
      mockAxiosAdapter.onGet(`${APIRoute.Reviews}/${id}`).reply(400, []);

      await store.dispatch(fetchReviewsAction(id));
      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyPlacesAction', () => {
    it('Should dispatch "fetchNearbyPlacesAction.pending", "fetchNearbyPlacesAction.fulfilled" when server response 200', async () => {
      const mocksNearby = [getFakeShortOffer()];
      const id = '1111';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`).reply(200, mocksNearby);

      await store.dispatch(fetchNearbyPlacesAction(id));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearbyPlacesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearbyPlacesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearbyPlacesAction.pending.type,
        fetchNearbyPlacesAction.fulfilled.type,
      ]);

      expect(fetchNearbyPlacesActionFulfilled.payload)
        .toEqual(mocksNearby);
    });

    it('Should dispatch "fetchNearbyPlacesAction.pending", "fetchNearbyPlacesAction.rejected" when server response 400', async () => {
      const id = '1111';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`).reply(400, []);

      await store.dispatch(fetchNearbyPlacesAction(id));
      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchNearbyPlacesAction.pending.type,
        fetchNearbyPlacesAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyPlacesAction', () => {
    it('Should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.fulfilled" when server response 200', async () => {
      const mocksFavorites = [getFakeFavorite()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mocksFavorites);

      await store.dispatch(fetchFavoritesAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);

      expect(fetchFavoritesActionFulfilled.payload)
        .toEqual(mocksFavorites);
    });

    it('Should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoritesAction());
      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('submitReviewAction', () => {
    it('Should dispatch "submitReviewAction.pending", "submitReviewAction.fulfilled" when server response 200', async () => {
      const id = '1111';
      const reviewData = {id: id, rating: 3, comment: 'test comment',};
      const fakeServerReply = getFakeReview();
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/${id}`).reply(201, fakeServerReply);

      await store.dispatch(submitReviewAction(reviewData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        submitReviewAction.pending.type,
        fetchReviewsAction.pending.type,
        submitReviewAction.fulfilled.type,
      ]);
    });

    it('Should dispatch "submitReviewAction.pending", "submitReviewAction.rejected" when server response 400', async () => {
      const id = '1111';
      const reviewData = {id: id, rating: 3, comment: 'test comment',};
      const fakeServerReply = getFakeReview();
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/${id}`).reply(400, fakeServerReply);

      await store.dispatch(submitReviewAction(reviewData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        submitReviewAction.pending.type,
        submitReviewAction.rejected.type,
      ]);
    });
  });

  describe('addToFavoriteAction', () => {
    it('Should dispatch "addToFavoriteAction.pending", "fetchFavoritesAction.pending", "addToFavoriteAction.fulfilled" when server response 200', async () => {
      const id = '1111';
      const status = 1;
      const fakeServerReply = getFakeOfferDetails();
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${status}`).reply(200, fakeServerReply);

      await store.dispatch(addToFavoriteAction({status: status, id: id,},));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addToFavoriteAction.pending.type,
        fetchFavoritesAction.pending.type,
        addToFavoriteAction.fulfilled.type,
      ]);
    });

    it('Should dispatch "addToFavoriteAction.pending", "addToFavoriteAction.rejected" when server response 400', async () => {
      const id = '1111';
      const status = 1;
      const fakeServerReply = getFakeOfferDetails();
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${status}`).reply(400, fakeServerReply);

      await store.dispatch(addToFavoriteAction({status: status, id: id,},));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addToFavoriteAction.pending.type,
        addToFavoriteAction.rejected.type,
      ]);
    });
  });

});
