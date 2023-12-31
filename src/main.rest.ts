#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { Component } from './shared/types/component.enum.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';
import { createOfferFavoritesContainer } from './shared/modules/offer-favorites/offer-favorites.container.js';
import { createAuthContainer } from './shared/modules/auth/index.js';


async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createOfferFavoritesContainer(),
    createAuthContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.Application);
  await application.init();
}

bootstrap();
