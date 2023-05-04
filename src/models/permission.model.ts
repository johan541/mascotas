/* eslint-disable indent */
import { prop, getModelForClass } from '@typegoose/typegoose';

export class Permission {
  @prop({ required: true, trim: true, unique: true })
  name: string;
}

export const PermissionModel = getModelForClass(Permission);
