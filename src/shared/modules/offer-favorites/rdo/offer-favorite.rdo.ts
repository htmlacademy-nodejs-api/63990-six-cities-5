import { Expose, Type } from 'class-transformer';
import { OfferRdo } from '../../offer/index.js';

export class OfferFavoriteRdo {
  @Expose({ name: '_id'})
  public id: string;

  @Expose({ name: 'offerId'})
  @Type(() => OfferRdo)
  public offer: OfferRdo;
}
