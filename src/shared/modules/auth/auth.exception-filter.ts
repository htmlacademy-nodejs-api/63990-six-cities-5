import { inject, injectable } from 'inversify';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Request, Response, NextFunction } from 'express';
import { BaseUserException } from './exceptions/base-user.exception.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  catch(error: Error, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);

    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        type: 'AUTHORIZATION',
        error: error.message,
      });
  }
}
