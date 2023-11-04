import { IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsString, IsBoolean, isLatitude, isLongitude } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { registerDecorator, ValidationOptions } from 'class-validator';

import { City, HouseType, FacilitiesType, Coords } from '../../../types/index.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.name.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.name.maxLength })
  public name: string;

  @MinLength(20, { message: CreateOfferValidationMessage.desc.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.desc.maxLength })
  public desc: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.createDate.invalidFormat })
  public createDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @IsString({ message: CreateOfferValidationMessage.preview.invalid })
  public preview: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  @IsString({ each: true, message: CreateOfferValidationMessage.photos.invalid })
  public photos: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalid })
  public isPremium: boolean;

  @IsEnum(HouseType, { message: CreateOfferValidationMessage.houseType.invalid })
  public houseType: HouseType;

  @IsInt({ message: CreateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomsCount.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsCount.maxValue })
  public roomsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestsCount.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guestsCount.maxValue })
  public guestsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.cost.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.cost.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.cost.maxValue })
  public cost: number;

  @IsArray({ message: CreateOfferValidationMessage.facilities.invalidFormat })
  @IsEnum(FacilitiesType, { each: true, message: CreateOfferValidationMessage.facilities.invalid })
  public facilities: FacilitiesType[];

  public author: string;

  @IsCoords({ message: CreateOfferValidationMessage.coords.invalid })
  public coords: Coords;
}

export function IsCoords(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsCoords',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Array<number>) {
          const [latitude, longitude] = value;
          return isLatitude(latitude.toString()) && isLongitude(longitude.toString());
        },
      },
    });
  };
}
