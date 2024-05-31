import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  Offer,
  User,
} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {

    const [
      offerName,
      offerDescription,
      data,
      city,
      offerPreview,
      offerImages,
      isPremium,
      isFavorites,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      name,
      email,
      avatar,
      userType,
      comments,
      coordinates,
    ] = line.split('\t');

    return {
      offerName,
      offerDescription,
      data: new Date(data),
      city,
      offerPreview,
      offerImages: this.parseString(offerImages),
      isPremium,
      isFavorites,
      rating: this.parseNumber(rating),
      type: type as 'apartment' | 'house' |'room' | 'hotel',
      bedrooms: this.parseNumber(bedrooms),
      maxAdults: this.parseNumber(maxAdults),
      price: this.parseNumber(price),
      goods: this.parseString(goods),
      offerAuthor: this.parseUser(name, email, userType as 'ordinary' | 'pro', avatar),
      comments: this.parseNumber(comments),
      coordinates: this.parseString(coordinates),
    };
  }

  private parseString(str: string): string[] {
    return str.split(';').map((name) => name);
  }

  private parseNumber(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseUser(
    userName: string,
    email: string,
    userType: 'ordinary' | 'pro',
    avatar: string
  ): User {
    return { userName, email, userType, avatar };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
