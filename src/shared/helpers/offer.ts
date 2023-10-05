import { City } from '../types/city.enum.js';
import { FacilitiesType } from '../types/facilities-type.enum.js';
import { HouseType } from '../types/house-type.enum.js';
import { Offer } from '../types/offer.type.js';


export function createOffer(offerData: string): Offer {
  const [name, desc, createDate, city, preview, photos, isPremium, isFavorite, rating, houseType, roomsCount, guestsCount, cost, facilities, author, commentsCount, coords] = offerData.split('\t');
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

  return offer;
}
