export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export const offersMocks: Offer[] = [
  {
    id: '34f50f68-803c-43a9-8d59-9556fb9c0eaa',
    title: 'The house among olive ',
    type: 'hotel',
    price: 197,
    previewImage: 'https://13.design.pages.academy/static/hotel/10.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 1.1
  },
  {
    id: '4b658388-7118-4e47-806a-fa5b0d41e8b0',
    title: 'Amazing and Extremely Central Flat',
    type: 'apartment',
    price: 174,
    previewImage: 'https://13.design.pages.academy/static/hotel/18.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.5
  },
  {
    id: 'c99c9239-7836-4115-a767-ee81c4b835ad',
    title: 'Amazing and Extremely Central Flat',
    type: 'room',
    price: 224,
    previewImage: 'https://13.design.pages.academy/static/hotel/3.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 2
  },
  {
    id: 'da8f15d8-bbad-47d3-a91f-23b54d24bf53',
    title: 'Loft Studio in the Central Area',
    type: 'room',
    price: 255,
    previewImage: 'https://13.design.pages.academy/static/hotel/17.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5
  },
];
