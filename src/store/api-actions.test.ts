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
import { checkAuthAction, fetchFavoritesAction, fetchOffersAction, loginAction } from './api-actions';

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
    it('Should fsdfdsfsd ', async () => {
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
  });

});
