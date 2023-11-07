import { inject, injectable } from 'inversify';
import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../logger/logger.interface.js';
import mongoose, { Mongoose } from 'mongoose';

import { setTimeout } from 'node:timers/promises';

const RETRY = {
  COUNT: 5,
  TIMEOUT: 1000,
} as const;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {

  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(url: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    let attempt = 0;
    while (attempt < RETRY.COUNT) {
      try {
        this.mongoose = await mongoose.connect(url);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(RETRY.TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connection after ${RETRY.COUNT}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to database');
    }

    await this.mongoose?.disconnect();
    this.isConnected = false;

    this.logger.info('Disconnected from database');
  }
}
