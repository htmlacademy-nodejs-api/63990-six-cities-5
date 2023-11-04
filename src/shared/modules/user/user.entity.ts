import { createSHA256 } from '../../helpers/index.js';
import { User, UserType } from '../../types/user.type.js';
import { getModelForClass, prop, defaultClasses, modelOptions } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, default: '' })
  public name: string;

  @prop({ required: true, unique: true, default: '' })
  public email: string;

  @prop({ required: false, default: '' })
  public avatar?: string;

  @prop({ required: true, default: '' })
  public type: UserType;

  @prop({ required: true, default: '' })
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const passwordHash = createSHA256(password, salt);
    return passwordHash === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
