import { SortType } from '../const';
import { ShortOffer } from '../types/offer';

const MAX_STARS = 5;

export const calcRating = (rating: number): number => Math.round(rating) / MAX_STARS * 100;

export const getCityOffers = (city: string, allOffers: ShortOffer[]): ShortOffer[] => allOffers.filter((offer) => offer.city.name === city);

export const sortOffers = (offers: ShortOffer[], sortType: SortType): ShortOffer[] => {
  switch (sortType) {
    case SortType.HighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.LowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.Top:
      return [...offers].sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
      return offers;
  }
};
