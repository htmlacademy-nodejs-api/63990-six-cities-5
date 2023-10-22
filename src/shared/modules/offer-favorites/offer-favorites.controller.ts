import { injectable, inject } from 'inversify';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferFavoritesService } from './offer-favorites-service.interface.js';


@injectable()
export class OfferFavoritesController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferFavoritesService) private readonly offerFaviritesService: OfferFavoritesService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferFavoritesController…');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.add });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.delete });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
  }

  public async add(req: Request, res: Response): Promise<void> {
    await this.offerFaviritesService.add(req.body);
    this.ok(res, {message: 'Added to favorites'});
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await this.offerFaviritesService.delete(req.body);
    this.noContent(res, {message: 'Deleted to favorites'});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const favorites = await this.offerFaviritesService.find();
    this.ok(res, favorites);
  }
}
