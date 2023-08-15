import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import { fetchFavoritesAction, fetchNearbyPlacesAction, fetchOfferDetailsAction, fetchOffersAction, fetchReviewsAction } from '../api-actions';

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
        state.isOffersLoading = false;
      })
      .addCase(fetchOfferDetailsAction.pending, (state) => {
        state.isOfferDetailsLoading = true;
      })
      .addCase(fetchOfferDetailsAction.fulfilled, (state, action) => {
        state.offerDetails = action.payload;
        state.isOfferDetailsLoading = false;
      })
      .addCase(fetchOfferDetailsAction.rejected, (state) => {
        state.isOfferDetailsLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoading = false;
      })
      .addCase(fetchNearbyPlacesAction.pending, (state) => {
        state.isNearbyPlacesLoading = true;
      })
      .addCase(fetchNearbyPlacesAction.fulfilled, (state, action) => {
        state.nearbyPlaces = action.payload;
        state.isNearbyPlacesLoading = false;
      })
      .addCase(fetchNearbyPlacesAction.rejected, (state) => {
        state.isNearbyPlacesLoading = false;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      });
  },
});
