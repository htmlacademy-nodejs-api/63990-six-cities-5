import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public name: string;

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
}
