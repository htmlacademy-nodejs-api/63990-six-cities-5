import { City } from "./city.enum.js";
import { Coords } from "./coords.type.js";
import { FacilitiesType } from "./facilities-type.enum.js";
import { HouseType } from "./house-type.enum.js";

export type Offer = {
  name: string;
  desc: string;
  createDate: Date;
  city: City;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  houseType: HouseType;
  roomsCount: number;
  guestsCount: number;
  cost: number;
  facilities: FacilitiesType[];
  author: string;
  commentsCount: number;
  coords: Coords;
}
