import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { types } from '@typegoose/typegoose';
import { OfferFavoritesService } from './offer-favorites-service.interface.js';
import { DefaultOfferFavoritesService } from './default-offer-favorites.service.js';
import { OfferFavoritesEntity, OfferFavoritesModel } from './offer-favorites.entity.js';
import { OfferFavoritesController } from './offer-favorites.controller.js';
import { Controller } from '../../libs/rest/index.js';

export function createOfferFavoritesContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferFavoritesService>(Component.OfferFavoritesService).to(DefaultOfferFavoritesService);
  offerContainer.bind<types.ModelType<OfferFavoritesEntity>>(Component.OfferFavoritesModel).toConstantValue(OfferFavoritesModel);
  offerContainer.bind<Controller>(Component.OfferFavoritesController).to(OfferFavoritesController);

  return offerContainer;
}
