import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './actions';
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
  async(_arg, {extra: api}) => {
    const {data} = await api.get<ShortOffer[]>(APIRoute.Offers);
    return data;
  });

export const fetchOfferDetailsAction = createAsyncThunk<
  OfferDetails, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferDetails',
  async(id, {extra: api}) => {
    const {data} = await api.get<OfferDetails>(`${APIRoute.Offers}/${id}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<
  Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async(id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    return data;
  }
);

export const fetchNearbyPlacesAction = createAsyncThunk<
  ShortOffer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyPlaces',
  async(id, {extra: api}) => {
    const {data} = await api.get<ShortOffer[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<
  Favorite[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>('data/fetchFavorites',
    async(_arg, {extra: api}) => {
      const {data} = await api.get<Favorite[]>(APIRoute.Favorite);
      return data;
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
    dispatch(fetchOffersAction());
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
    dispatch(fetchOffersAction());
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
    console.log('logout');
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
