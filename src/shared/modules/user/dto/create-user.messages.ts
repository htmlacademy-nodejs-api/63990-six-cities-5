export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatar: {
    invalidFormat: 'avatarPath is required',
  },
  name: {
    invalidFormat: 'firstname is required',
    lengthField: 'min length is 1, max is 15',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
  type: {
    invalid: 'type must be default or pro',
  },
} as const;
