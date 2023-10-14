import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { City } from '../../types/city.enum.js';
import { HouseType } from '../../types/house-type.enum.js';
import { FacilitiesType } from '../../types/facilities-type.enum.js';
import { Coords } from '../../types/coords.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, minlength: 10, maxlength: 100 })
  public name: string;

  @prop({trim: true, minlength: 20, maxlength: 1024})
  public desc: string;

  @prop()
  public createDate: Date;

  @prop({
    type: () => String,
    enum: City,
    required: true
  })
  public city: City;

  @prop({ required: true })
  public preview: string;

  @prop({ required: true })
  public photos: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating: number;

  @prop({
    type: () => String,
    enum: HouseType,
    required: true
  })
  public houseType: HouseType;

  @prop({ required: true, min: 1, max: 8 })
  public roomsCount: number;

  @prop({ required: true, min: 1, max: 10 })
  public guestsCount: number;

  @prop({ required: true, min: 100, max: 100000 })
  public cost: number;

  @prop({
    type: () => String,
    enum: FacilitiesType,
    required: true
  })
  public facilities: FacilitiesType[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public author: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount?: number;

  @prop({ required: true })
  public coords: Coords;
}

export const OfferModel = getModelForClass(OfferEntity);
