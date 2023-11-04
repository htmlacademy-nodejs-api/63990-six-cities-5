import { injectable, inject } from 'inversify';
import { BaseController, HttpMethod, ValidateDtoMiddleware } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferFavoritesService } from './offer-favorites-service.interface.js';
import { AddFavoriteOfferDto } from './dto/add-favorite-offer.dto.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferFavoriteRdo } from './index.js';


@injectable()
export class OfferFavoritesController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferFavoritesService) private readonly offerFaviritesService: OfferFavoritesService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferFavoritesController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.add,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(AddFavoriteOfferDto)
      ]
    });

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.delete });
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
  }

  public async add(req: Request, res: Response): Promise<void> {
    await this.offerFaviritesService.add({...req.body, userId: req.tokenPayload.id});
    this.ok(res, {message: 'Added to favorites'});
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await this.offerFaviritesService.delete(req.body);
    this.noContent(res, {message: 'Deleted to favorites'});
  }

  public async index(req: Request, res: Response): Promise<void> {
    const favorites = await this.offerFaviritesService.find(req.tokenPayload.id);

    this.ok(res, fillDTO(OfferFavoriteRdo, favorites));
  }
}
