const MAX_STARS = 5;

export const calcRating = (rating: number): number => Math.round(rating) / MAX_STARS * 100;
