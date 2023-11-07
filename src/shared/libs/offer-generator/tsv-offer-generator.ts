import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { MockServerData } from '../../types/mock-server-data.type.js';

const Rules = {
  minRating: 1,
  maxRating: 5,

  minRooms: 1,
  maxRooms: 8,

  minGuests: 1,
  maxGuests: 10,

  firstWeekDay: 1,
  lastWeekDay: 7,

  minCost: 100,
  maxCost: 100000,
} as const;


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem(this.mockData.titles);
    const desc = getRandomItem(this.mockData.descriptions);
    const city = getRandomItem(this.mockData.cities);
    const preview = getRandomItem(this.mockData.photos);
    const photos = getRandomItems(this.mockData.photos).join(';');
    const isPremium = Boolean(generateRandomValue(0, 1)).toString();
    const isFavorite = Boolean(generateRandomValue(0, 1)).toString();
    const rating = generateRandomValue(Rules.minRating, Rules.maxCost).toString();
    const houseType = getRandomItem(this.mockData.houseTypes);
    const roomsCount = generateRandomValue(Rules.minRooms, Rules.maxRooms).toString();
    const guestsCount = generateRandomValue(Rules.minGuests, Rules.maxGuests).toString();
    const cost = generateRandomValue(Rules.minCost, Rules.maxCost).toString();
    const facilities = getRandomItems(this.mockData.facilities).join(';');
    const author = getRandomItem(this.mockData.users);
    const commentsCount = generateRandomValue(1,5).toString();
    const coords = getRandomItem<number[]>(this.mockData.coords).join(';');

    const createdDate = dayjs()
      .subtract(generateRandomValue(Rules.firstWeekDay, Rules.lastWeekDay), 'day')
      .toISOString();

    return [
      name, desc, createdDate, city, preview,
      photos, isPremium, isFavorite,
      rating, houseType, roomsCount, guestsCount,
      cost, facilities, author, commentsCount, coords
    ].join('\t');
  }
}
