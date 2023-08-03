import { ShortOffer } from '../types/offer';

const MAX_STARS = 5;

export const calcRating = (rating: number): number => Math.round(rating) / MAX_STARS * 100;

export const getCityOffers = (city: string, allOffers: ShortOffer[]) => allOffers.filter((offer) => offer.city.name === city);
