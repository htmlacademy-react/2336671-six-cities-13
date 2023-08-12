import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthStatus } from '../const';
import { redirectToRoute, requireAuth, setNearbyPlacesLoading, setOfferDetailsLoading, setOffersLoading, setReviewsLoading, storeNearbyPlaces, storeOfferDetails, storeOffers, storeReviews, storeUserInfo } from './actions';
import { ShortOffer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { removeToken, saveToken } from '../services/token';
import { OfferDetails } from '../types/offer-details';
import { Review } from '../types/review';
import { ReviewData } from '../types/review-data';

export const fetchOffersAction = createAsyncThunk<
  void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async(_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersLoading(true));
      const {data} = await api.get<ShortOffer[]>(APIRoute.Offers);
      dispatch(setOffersLoading(false));
      dispatch(storeOffers(data));
    } catch {
      dispatch(setOffersLoading(false));
    }

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
    try {
      dispatch(setOfferDetailsLoading(true));
      const {data} = await api.get<OfferDetails>(`${APIRoute.Offers}/${id}`);
      dispatch(setOfferDetailsLoading(false));
      dispatch(storeOfferDetails(data));
    } catch {
      dispatch(setOfferDetailsLoading(false));
    }
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
    try {
      dispatch(setReviewsLoading(true));
      const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
      dispatch(setReviewsLoading(false));
      dispatch(storeReviews(data));
    } catch {
      dispatch(setReviewsLoading(false));
    }
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
    try {
      dispatch(setNearbyPlacesLoading(true));
      const {data} = await api.get<ShortOffer[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
      dispatch(setNearbyPlacesLoading(false));
      dispatch(storeNearbyPlaces(data));
    } catch {
      dispatch(setNearbyPlacesLoading(false));
    }
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
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuth(AuthStatus.Auth));
      dispatch(storeUserInfo(data));
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

    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});

    saveToken(data.token);
    dispatch(storeUserInfo(data));
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

export const submitReviewAction = createAsyncThunk<
  void, ReviewData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >(
    'data/submitReview',
    async({id, comment, rating}, {dispatch, extra: api}) => {
      await api.post<ReviewData>(`${APIRoute.Reviews}/${id}`, {comment, rating});
      dispatch(fetchReviewsAction(id));
    }
  );
