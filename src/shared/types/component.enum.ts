export const Component = {
  Application: Symbol.for('Application'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),

  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),

  OfferController: Symbol.for('OfferController'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),

  CommentService: Symbol.for('CommentService'),
  CommentModel: Symbol.for('CommentModel'),
  CommentController: Symbol.for('CommentController'),

  ExceptionFilter: Symbol.for('ExceptionFilter'),

  OfferFavoritesService: Symbol.for('OfferFavoritesService'),
  OfferFavoritesModel: Symbol.for('OfferFavoritesModel'),
  OfferFavoritesController: Symbol.for('OfferFavoritesController'),
} as const;
