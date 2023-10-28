export const CreateOfferValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 10',
    maxLength: 'Maximum name length must be 100',
  },
  desc: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  createDate: {
    invalidFormat: 'createDate must be a valid ISO date',
  },
  city: {
    invalid: 'type must be City',
  },
  cost: {
    invalidFormat: 'Cost must be an integer',
    minValue: 'Minimum cost is 100',
    maxValue: 'Maximum cost is 100000',
  },
  author: {
    invalidId: 'userId field must be a valid id',
  },
  preview: {
    invalid: 'preview must be url'
  },
  photos: {
    invalidFormat: 'Field photos must be an array',
    invalid: 'Photos field must be an array of urls',
  },
  isPremium: {
    invalid: 'isPremium must be boolean'
  },
  houseType: {
    invalid: 'type must be HouseType',
  },
  roomsCount: {
    invalidFormat: 'roomsCount must be an integer',
    minValue: 'Minimum roomsCount is 1',
    maxValue: 'Maximum roomsCount is 8',
  },
  guestsCount: {
    invalidFormat: 'guestsCount must be an integer',
    minValue: 'Minimum guestsCount is 1',
    maxValue: 'Maximum guestsCount is 10',
  },
  facilities: {
    invalid: 'type must be Facilities',
  },
  coords: {
    invalid: 'coords must be latlong'
  }
} as const;
