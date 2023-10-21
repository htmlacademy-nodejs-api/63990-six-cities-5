import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public cost: number;

  @Expose()
  public type: string;

  @Expose()
  public isFavorite: string;

  @Expose()
  public isPremium: string;

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
