import { IsMongoId } from 'class-validator';
import { AddFavoriteMessages } from './add-favorite-offer.messages.js';

export class AddFavoriteOfferDto {
  @IsMongoId({ message: AddFavoriteMessages.offerId.invalidFormat })
  public offerId: string;

  public userId: string;
}
