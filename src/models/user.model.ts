/* eslint-disable indent */
import { prop, modelOptions, getModelForClass, type Ref } from '@typegoose/typegoose';

import { Person } from './person.model';
import { Role } from './role.model';

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true, trim: true, lowercase: true, unique: true })
  username: string;

  @prop({ trim: true })
  password?: string;

  @prop({ default: true })
  isActive?: boolean;

  @prop({ required: true, ref: () => Person })
  person: Ref<Person>;

  @prop({ required: true, ref: () => Role })
  role: Ref<Role>;
}

export const UserModel = getModelForClass(User);
