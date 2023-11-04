import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { SortType } from '../../types/sort-type.enum.js';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate({
        path: 'isFavorite',
        model: 'OfferFavoritesModel',
        match: {
          userId: { $eq: userId }
        }
      })
      .exec();
  }

  public async findByName(name: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findOne({ name })
      .exec();
  }

  public async find(limit = DEFAULT_OFFER_COUNT, userId = ''): Promise<DocumentType<OfferEntity>[]> {
    const result = this.offerModel
      .find()
      .limit(limit)
      .sort({createDate: SortType.Down});

    const populateOptions = {
      path: 'isFavorite',
      model: 'OfferFavoritesModel',
      match: {
        userId: { $eq: userId }
      },
    };

    return userId ? result.populate(populateOptions) : result;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string, rating: number): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentsCount: 1,
        commentsRatingSum: rating
      }}).exec();
  }

  public async findPremium(count: number, city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isPremium: true, city })
      .sort({ createdAt: SortType.Down })
      .limit(count)
      .exec();
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isFavorite: true})
      .exec();
  }
}
