import { injectable, inject } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { UpdateOfferRequest } from './update-offer-request.type.js';
import { DeleteOfferRequest } from './delete-offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:id', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.delete });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();

    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {

    const existOffer = await this.offerService.findByName(body.name);

    if (existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with name «${body.name}» exists.`,
        'OfferController'
      );

    }

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async update(
    req: UpdateOfferRequest,
    res: Response
  ): Promise<void> {

    if (!req.params.id) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Offer id not specified',
        'OfferController'
      );
    }

    const existOffer = await this.offerService.findById(req.params.id);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id «${req.params.id}» not found.`,
        'OfferController'
      );
    }

    const result = await this.offerService.updateById(req.params.id, req.body);
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async delete(
    req: DeleteOfferRequest,
    res: Response
  ): Promise<void> {

    if (!req.params.id) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Offer id not specified',
        'OfferController'
      );
    }

    const existOffer = await this.offerService.findById(req.params.id);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id «${req.params.id}» not found.`,
        'OfferController'
      );
    }

    await this.offerService.deleteById(req.params.id);
    this.ok(res, { message: `Offer with id «${req.params.id}» deleted.`});
  }
}
