#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { RestConfig } from './shared/libs/config/rest.config.js';
import { PinoLogger, Logger } from './shared/libs/logger/index.js';
import { Config, RestSchema } from './shared/libs/config/index.js';
import { Component } from './shared/types/component.enum.js';


async function bootstrap() {
  const container = new Container();

  container.bind<RestApplication>(Component.Application).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.Application);
  await application.init();
}

bootstrap();
