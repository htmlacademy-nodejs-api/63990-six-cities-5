import { City, HouseType, FacilitiesType, Coords } from '../../../types/index.js';

export class UpdateOfferDto {
  public name?: string;
  public desc?: string;
  public createDate?: Date;
  public city?: City;
  public preview?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public houseType?: HouseType;
  public roomsCount?: number;
  public guestsCount?: number;
  public cost?: number;
  public facilities?: FacilitiesType[];
  public author?: string;
  public commentsCount?: number;
  public coords?: Coords;
}
