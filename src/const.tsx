export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  Nearby = '/nearby',
  Favorite = '/favorite',
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offers/:ids',
  Other = '*'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  Unknown = 'UNKNOWN'
}

export const StarsRating = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly',
];

export const OfferType = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
} as const;

export enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  Top = 'Top rated first'
}

export const CitiesList = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum MapType {
  Offer = 'offer',
  Cities = 'cities',
}

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}
