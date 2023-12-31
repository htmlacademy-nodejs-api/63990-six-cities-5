import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../logger/logger.interface.js';
import { Route } from '../index.js';
import { Controller } from './controller.interface.js';
import { Response, Router } from 'express';
import { injectable } from 'inversify';
import asyncHandler from 'express-async-handler';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  constructor(
    protected logger: Logger,
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);

    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T) {
    res
      .contentType(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .send(data);
  }

  public ok<T>(res: Response, data: T) {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T) {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T) {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}
