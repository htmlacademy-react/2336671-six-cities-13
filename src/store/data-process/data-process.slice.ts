import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import { fetchOffersAction } from '../api-actions';

const initialState: DataProcess = {
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

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.isOffersLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = true;
      });
  },
});
