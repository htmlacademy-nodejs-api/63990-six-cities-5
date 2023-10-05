import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { MockServerData } from '../../types/mock-server-data.type.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_COST = 100;
const MAX_COST = 100000;

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
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const houseType = getRandomItem(this.mockData.houseTypes);
    const roomsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const cost = generateRandomValue(MIN_COST, MAX_COST).toString();
    const facilities = getRandomItems(this.mockData.facilities).join(';');
    const author = getRandomItem(this.mockData.users);
    const commentsCount = generateRandomValue(1,5).toString();
    const coords = getRandomItem<number[]>(this.mockData.coords).join(';');

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      name, desc, createdDate, city, preview,
      photos, isPremium, isFavorite,
      rating, houseType, roomsCount, guestsCount,
      cost, facilities, author, commentsCount, coords
    ].join('\t');
  }
}
