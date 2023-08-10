import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthStatus } from '../const';
import { redirectToRoute, requireAuth, setLoading, storeNearbyPlaces, storeOfferDetails, storeOffers, storeReviews } from './actions';
import { ShortOffer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { removeToken, saveToken } from '../services/token';
import { OfferDetails } from '../types/offer-details';
import { Review } from '../types/review';

export const fetchOffersAction = createAsyncThunk<
  void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async(_arg, {dispatch, extra: api}) => {
    dispatch(setLoading(true));
    const {data} = await api.get<ShortOffer[]>(APIRoute.Offers);
    dispatch(setLoading(false));
    dispatch(storeOffers(data));
  }
);

export const fetchOfferDetailsAction = createAsyncThunk<
  void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferDetails',
  async(id, {dispatch, extra: api}) => {
    dispatch(setLoading(true));
    const {data} = await api.get<OfferDetails>(`${APIRoute.Offers}/${id}`);
    dispatch(setLoading(false));
    dispatch(storeOfferDetails(data));
    dispatch(redirectToRoute(`${APIRoute.Offers}/${id}`));
  }
);

export const fetchReviewsAction = createAsyncThunk<
  void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async(id, {dispatch, extra: api}) => {
    dispatch(setLoading(true));
    const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    dispatch(setLoading(false));
    dispatch(storeReviews(data));
  }
);

export const fetchNearbyPlacesAction = createAsyncThunk<
  void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyPlaces',
  async(id, {dispatch, extra: api}) => {
    dispatch(setLoading(true));
    const {data} = await api.get<ShortOffer[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
    dispatch(setLoading(false));
    dispatch(storeNearbyPlaces(data));
  }
);

export const checkAuthAction = createAsyncThunk<
  void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async(_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuth(AuthStatus.Auth));
    } catch {
      dispatch(requireAuth(AuthStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<
  void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/login',
  async({login: email, password}, {dispatch, extra: api}) => {

    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});

    saveToken(token);
    dispatch(requireAuth(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<
void, undefined, {
dispatch: AppDispatch;
state: State;
extra: AxiosInstance;
}>(
  'user/logout',
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);

    removeToken();
    dispatch(requireAuth(AuthStatus.NoAuth));
  }
);
