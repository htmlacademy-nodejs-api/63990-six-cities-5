import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { OfferEntity } from '../offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferFavoritesEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers-favofites'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferFavoritesEntity extends defaultClasses.TimeStamps {
  @prop({
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId: Ref<OfferEntity>;
}

export const OfferFavoritesModel = getModelForClass(OfferFavoritesEntity);
