import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthStatus } from '../const';
import { redirectToRoute, requireAuth, setFavoritesLoading, setNearbyPlacesLoading, setOfferDetailsLoading, setOffersLoading, setReviewsLoading, storeFavorites, storeNearbyPlaces, storeOfferDetails, storeOffers, storeReviews, storeUserInfo } from './actions';
import { ShortOffer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { removeToken, saveToken } from '../services/token';
import { OfferDetails } from '../types/offer-details';
import { Review } from '../types/review';
import { ReviewData } from '../types/review-data';
import { Favorite } from '../types/favorite';

export const fetchOffersAction = createAsyncThunk<
  ShortOffer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async(_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoading(true));
    const {data} = await api.get<ShortOffer[]>(APIRoute.Offers);
    return data;
  });

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

export const fetchFavoritesAction = createAsyncThunk<
  void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>('data/fetchFavorites',
    async(_arg, {dispatch, extra: api}) => {
      try {
        dispatch(setFavoritesLoading(true));
        const {data} = await api.get<Favorite[]>(APIRoute.Favorite);
        dispatch(storeFavorites(data));
        dispatch(setFavoritesLoading(false));
      } catch {
        dispatch(setFavoritesLoading(false));
      }
    }
  );

export const checkAuthAction = createAsyncThunk<
  UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async(_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoritesAction());
    return data;
  }
);

export const loginAction = createAsyncThunk<
UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/login',
  async({login: email, password}, {dispatch, extra: api}) => {

    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});

    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
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
    dispatch(fetchOffersAction());
  }
);

export const submitReviewAction = createAsyncThunk<
  void, ReviewData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/submitReview',
    async({id, comment, rating}, {dispatch, extra: api}) => {
      await api.post<ReviewData>(`${APIRoute.Reviews}/${id}`, {comment, rating});
      dispatch(fetchReviewsAction(id));
    }
  );

export const addToFavoriteAction = createAsyncThunk<
    void,
    {
      status: number;
      id: string;
    },
    {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }
>('data/addToFavorite',
  async({status, id}, {dispatch, extra: api}) => {
    await api.post(`${APIRoute.Favorite}/${id}/${status}`);
    dispatch(fetchFavoritesAction());
    dispatch(fetchOffersAction());
  }
);
