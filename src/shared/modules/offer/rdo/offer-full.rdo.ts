import { Expose } from 'class-transformer';
import { Coords, FacilitiesType, HouseType } from '../../../types/index.js';

export class OfferFullRdo {
  @Expose()
  public _id: string;

  @Expose()
  public name: string;

  @Expose()
  public desc: string;

  @Expose()
  public cost: number;

  @Expose()
  public type: string;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public createDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public rating: number;

  @Expose()
  public commentsCount: number;

  @Expose()
  public preview: string;

  @Expose()
  public photos: string[];

  @Expose()
  public houseType: HouseType;

  @Expose()
  public roomsCount: number;

  @Expose()
  public guestsCount: number;

  @Expose()
  public facilities: FacilitiesType[];

  @Expose()
  public coords: Coords;
}
