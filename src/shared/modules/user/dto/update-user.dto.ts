import { UserType } from '../../../types/index.js';

export class UpdateUserDto {
  public email?: string;
  public avatar?: string;
  public name?: string;
  public type?: UserType;
}
