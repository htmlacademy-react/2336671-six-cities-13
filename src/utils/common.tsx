import { SortType } from '../const';
import { ShortOffer } from '../types/offer';

const MAX_STARS = 5;

export const calcRating = (rating: number): number => Math.round(rating) / MAX_STARS * 100;

export const getSortedCityOffers = (city: string, allOffers: ShortOffer[], sortType: SortType) => {
  const currentCityOffers = allOffers.filter((offer) => offer.city.name === city);

  switch (sortType) {
    case SortType.HighToLow:
      return currentCityOffers.sort((a, b) => b.price - a.price);
    case SortType.LowToHigh:
      return currentCityOffers.sort((a, b) => a.price - b.price);
    case SortType.Top:
      return currentCityOffers.sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
      return currentCityOffers;
  }
};
