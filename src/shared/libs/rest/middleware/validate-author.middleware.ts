import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../index.js';
import { StatusCodes } from 'http-status-codes';
import { OfferService } from '../../../modules/offer/offer-service.interface.js';

export class ValidateAuthorMiddleware implements Middleware {
  constructor(
    private readonly service: OfferService,
  ) {}

  public async execute({ params, tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {

    const offer = await this.service.findById(params.offerId);

    if (offer && (offer.author.toString() !== tokenPayload.id)) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'It is not your offer',
        'OfferController'
      );
    }

    return next();
  }
}
