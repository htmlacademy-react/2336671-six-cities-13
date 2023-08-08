import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { storeOffers } from './actions';
import { ShortOffer } from '../types/offer';

export const fetchOffersAction = createAsyncThunk<
  void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async(_arg, {dispatch, extra: api}) => {

    const {data} = await api.get<ShortOffer[]>(APIRoute.Offers);

    dispatch(storeOffers(data));
  });
