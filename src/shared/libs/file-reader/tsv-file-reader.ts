import { readFileSync } from 'fs';
import { FileReader } from './file-reader.interface.js';
import { resolve } from 'path';
import { Offer } from '../../types/offer.type.js';
import { City } from '../../types/city.enum.js';
import { HouseType } from '../../types/house-type.enum.js';
import { FacilitiesType } from '../../types/facilities-type.enum.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filePath: string,
  ) {}

  read(): void {
    this.rawData = readFileSync(resolve(this.filePath), { encoding: 'utf-8' });
  }

  toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData.split('\n')
      .filter((row) => row.trim() !== '')
      .reduce((acc: Offer[], item) => {

        const [name, desc, createDate, city, preview, photos, isPremium, isFavorite, rating, houseType, roomsCount, guestsCount, cost, facilities, author, commentsCount, coords] = item.split('\t');
        const [latitude, longitude] = coords.split(';');
        const facilitiesData: FacilitiesType[] = facilities.split(';').map((value) => value as FacilitiesType);

        const offer: Offer = {
          name,
          desc,
          createDate: new Date(createDate),
          city: City[city as keyof typeof City],
          preview,
          photos: photos.split(';'),
          isPremium: Boolean(isPremium),
          isFavorite: Boolean(isFavorite),
          rating: Number(rating),
          houseType: HouseType[houseType as keyof typeof HouseType],
          roomsCount: Number(roomsCount),
          guestsCount: Number(guestsCount),
          cost: Number(cost),
          facilities: facilitiesData,
          author,
          commentsCount: Number(commentsCount),
          coords: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
        };

        return [...acc, offer];
      }, []);

  }
}
