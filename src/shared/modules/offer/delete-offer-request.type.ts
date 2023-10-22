import { Request } from 'express';
import { RequestParams } from '../../libs/rest/index.js';

export type DeleteOfferRequest = Request<RequestParams & {id?: string}>;
