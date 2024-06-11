import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  Offer,
  User,
} from '../../types/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(private readonly filename: string) {
    super();
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
