import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferFavoritesService } from './offer-favorites-service.interface.js';
import { OfferFavoritesEntity } from './offer-favorites.entity.js';
import { AddFavoriteOfferDto } from './dto/add-favorite-offer.dto.js';
import { DeleteFavoriteOfferDto } from './dto/delete-favorite-offer.dto.js';

@injectable()
export class DefaultOfferFavoritesService implements OfferFavoritesService {
  constructor(
    @inject(Component.OfferFavoritesModel) private readonly offerFavoritesModel: types.ModelType<OfferFavoritesEntity>
  ) {}

  public async find(): Promise<DocumentType<OfferFavoritesEntity>[]> {
    const results = await this.offerFavoritesModel.find().populate('offerId');
    return results;
  }

  public async add(dto: AddFavoriteOfferDto): Promise<void> {
    await this.offerFavoritesModel.create(dto);
  }

  public async delete(dto: DeleteFavoriteOfferDto): Promise<void> {
    await this.offerFavoritesModel.findOneAndDelete(dto);
  }
}
