import { injectable, inject } from 'inversify';
import { BaseController, HttpError, HttpMethod, RequestQuery, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { UpdateOfferRequest } from './update-offer-request.type.js';
import { ParamOfferId } from './type/param-offerId.type.js';
import { CommentService } from '../comment/comment-service.interface.js';
import { CommentRdo } from '../comment/index.js';
import { PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremium });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });


  }

  public async index(
    { query } : Request<unknown, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.find(query.limit);

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

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, offer);
  }

  public async update(
    req: UpdateOfferRequest,
    res: Response
  ): Promise<void> {

    const existOffer = await this.offerService.findById(req.params.offerId);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id «${req.params.offerId}» not found.`,
        'OfferController'
      );
    }

    const result = await this.offerService.updateById(req.params.offerId, req.body);
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async delete(
    req: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {

    const existOffer = await this.offerService.findById(req.params.offerId);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with id «${req.params.offerId}» not found.`,
        'OfferController'
      );
    }

    await this.offerService.deleteById(req.params.offerId);
    await this.commentService.deleteByOfferId(req.params.offerId);

    this.ok(res, { message: `Offer with id «${req.params.offerId}» deleted.`});
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response) {
    const offer = await this.offerService.exists(params.offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async getPremium(
    { query } : Request<unknown, unknown, unknown, RequestQuery>,
    res: Response
  ) {

    if (!query.city) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'City not specified.',
        'OfferController'
      );
    }

    const newOffers = await this.offerService.findPremium(PREMIUM_OFFER_COUNT, query.city);
    this.ok(res, fillDTO(OfferRdo, newOffers));
  }
}
