//import { CityName, Coordinates } from './city.type.js';
import { User } from './user.type.js';

//export type Coordinates = [ string , string ];
// export type CityName =
//   | 'Paris'
//   | 'Cologne'
//   | 'Brussels'
//   | 'Amsterdam'
//   | 'Hamburg'
//   | 'Dusseldorf';

//export type OfferType = 'apartment' | 'house' |'room' | 'hotel'

export type Offer = {
  offerName: string
  offerDescription: string
  data: Date
  city: string
  offerPreview: string
  offerImages: string[]
  isPremium: string
  isFavorites: string
  rating: number
  type: 'apartment' | 'house' |'room' | 'hotel'
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[]
  offerAuthor: User
  comments: number
  coordinates: string[]
};
