import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';


export type UpdateOfferRequest = Request<RequestParams & {id?: string}, RequestBody, UpdateOfferDto>;
