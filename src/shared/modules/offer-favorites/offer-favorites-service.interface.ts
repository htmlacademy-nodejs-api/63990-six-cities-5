import { DocumentType } from '@typegoose/typegoose';
import { AddFavoriteOfferDto } from './dto/add-favorite-offer.dto.js';
import { DeleteFavoriteOfferDto } from './dto/delete-favorite-offer.dto.js';
import { OfferFavoritesEntity } from './offer-favorites.entity.js';

export interface OfferFavoritesService {
  find(): Promise<DocumentType<OfferFavoritesEntity>[]>;
  add(dto: AddFavoriteOfferDto): Promise<void>;
  delete(dto: DeleteFavoriteOfferDto): Promise<void>;
}
