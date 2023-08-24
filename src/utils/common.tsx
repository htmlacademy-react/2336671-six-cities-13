import { SortType } from '../const';
import { ShortOffer } from '../types/offer';
import { Review } from '../types/review';

const MAX_STARS = 5;

export const calculateRating = (rating: number): number => Math.round(rating) / MAX_STARS * 100;

export const getSortedCityOffers = (city: string, allOffers: ShortOffer[], sortType: SortType): ShortOffer[] => {
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

export const getSortedByDateAndCropedReviews = (reviews: Review[]):Review[] => [...reviews].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 10);

export const getRandomArrayElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];
