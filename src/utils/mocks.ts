import { internet, name, helpers } from 'faker';
import { UserData } from '../types/user-data';
import { ShortOffer } from '../types/offer';
import { random } from 'faker';
import { address } from 'faker';
import { datatype } from 'faker';
import { image } from 'faker';
import { Favorite } from '../types/favorite';
import { Review } from '../types/review';
import { OfferDetails } from '../types/offer-details';
import { createApi } from '../services/api';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

export const getFakeUserData = (): UserData => ({
  name: name.title(),
  avatarUrl: internet.avatar(),
  isPro: true,
  email: internet.email(),
  token: helpers.randomize(),
});

export const getFakeShortOffer = (): ShortOffer => ({
  id: datatype.uuid(),
  title: random.words(),
  type: random.word(),
  price: datatype.number(),
  previewImage: image.imageUrl(),
  city: {
    name: address.cityName(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(),
    },
  },
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.float(),
});

export const getFakeFavorite = (): Favorite => ({
  id: datatype.uuid(),
  title: random.words(),
  type: random.word(),
  price: datatype.number(),
  city: {
    name: address.cityName(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(),
    },
  },
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.float(),
  previewImage: image.imageUrl(),
});

export const getFakeOfferDetails = (): OfferDetails => ({
  id: datatype.uuid(),
  title: random.words(),
  description: random.words(),
  type: random.word(),
  price: datatype.number(),
  images: [image.imageUrl()],
  city: {
    name: address.cityName(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(),
    },
  },
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  goods: [random.words()],
  host: {
    isPro: datatype.boolean(),
    name: name.title(),
    avatarUrl: internet.avatar(),
  },
  isPremium: datatype.boolean(),
  isFavorite: datatype.boolean(),
  rating: datatype.float(),
  bedrooms: datatype.number(),
  maxAdults: datatype.number(),
});

export const getFakeReview = (): Review => ({
  id: datatype.uuid(),
  comment: random.words(),
  date: String(datatype.datetime()),
  rating: datatype.float(),
  user: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
  },
});
