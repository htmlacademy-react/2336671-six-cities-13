export const toSentenceCase = (text: string) => text.toLowerCase().charAt(0).toUpperCase() + text.slice(1);

export const calcRating = (rating: number) => rating / 5 * 100;
