export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
}

export const reviewsMocks: Review[] = [
  {
    id: '5abcc770-15be-46cb-85ba-07bbc0c50bdf',
    comment: 'This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.',
    date: '2023-06-23T21:00:00.624Z',
    rating: 1,
    user: {
      name: 'Mollie',
      avatarUrl: 'https://13.design.pages.academy/static/avatar/6.jpg',
      isPro: true
    }
  },
  {
    id: '77797f88-718b-44b4-95fd-23a9056d4cb6',
    comment: 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
    date: '2023-06-21T21:00:00.624Z',
    rating: 1,
    user: {
      name: 'Christina',
      avatarUrl: 'https://13.design.pages.academy/static/avatar/10.jpg',
      isPro: false
    }
  }
];
