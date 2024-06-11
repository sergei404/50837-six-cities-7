import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../halpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_OFFER_RATING = 1;
const MAX_OFFER_RATING = 5;

const MIN_RANDOM_PRICE = 100;
const MAX_RANDOM_PRICE = 100000;

const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 10;

const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 8;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const dateTime = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.images);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium: string = Math.random() > 0.5 ? 'Premium' : '';
    const isFavorites: string = Math.random() > 0.5 ? 'Favorites' : '';
    const rating = generateRandomValue(MIN_OFFER_RATING, MAX_OFFER_RATING);
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(MIN_ROOM_COUNT, MAX_ROOM_COUNT);
    const maxAdults = generateRandomValue(MIN_GUEST_COUNT, MAX_GUEST_COUNT);
    const price = generateRandomValue(MIN_RANDOM_PRICE, MAX_RANDOM_PRICE);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const userName = getRandomItem(this.mockData.userNames);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const userType = getRandomItem(this.mockData.userType);
    const coordinates = this.mockData.coordinates[city].join(';');

    return [
      title,
      description,
      dateTime,
      city,
      previewImage,
      images,
      isPremium,
      isFavorites,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      userName,
      email,
      avatar,
      userType,
      coordinates
    ].join('\t');
  }
}
