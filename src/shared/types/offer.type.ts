import { User } from './user.type.js';

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
